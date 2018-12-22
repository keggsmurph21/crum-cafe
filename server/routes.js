'use strict';

const funcs = require('./funcs');

const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');
//const Student = require('./models/Student');

module.exports = (app, passport) => {

  // index page
  app.get('/', (req, res) => {
    res.render('index.ejs', {
      user: req.session.admin,
      message: req.flash('index'),
    });
  });

  app.get('/about', (req, res) => {
    res.render('about.ejs', {
      user: req.session.admin,
      message: req.flash('about'),
    });
  });
  // admin home page
  app.get('/admin', funcs.isLoggedIn, (req, res) => {
    res.render('admin.ejs', {
      user: req.session.admin,
      message: req.flash('admin'),
    });
  });

  // admin login pages
  app.get('/admin/login', funcs.isLoggedOut, (req, res) => {
    res.render('admin/login.ejs', {
      user: req.session.admin,
      message: req.flash('login'),
    });
  });
  app.post('/admin/login', passport.authenticate('web-login', {

    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true,

  }));

  // admin logout
  app.post('/admin/logout', funcs.isLoggedIn, (req, res) => {

    req.session.admin = null;
    res.redirect('/admin/login');

  });

  // admin registration pages
  app.get('/admin/register', funcs.isLoggedOut, (req, res) => {
    res.render('admin/register.ejs', {
      user: req.session.admin,
      message: req.flash('register'),
    });
  });
  app.post('/admin/register', passport.authenticate('web-register', {

    successRedirect: '/admin',
    failureRedirect: '/admin/register',
    failureFlash: true,

  }));

  /*
  app.get('/admin/registration', funcs.isLoggedIn, (req, res) => {
    res.text(config.REGISTER_SECRET);
  })
  app.post('/admin/registration', funcs.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.json(req.body);;
  });
  */

  app.get('/admin/menu', funcs.isLoggedIn, (req, res) => {
    MenuItem.find({}, (err, items) => {
      res.render('admin/menu.ejs', {
        user: req.session.admin,
        message: req.flash('admin-menu'),
        items: items,
      });
    });
  });

  app.get('/admin/menu/new', funcs.isLoggedIn, (req, res) => {
    res.render('admin/menu-item/new.ejs', {
      user: req.session.admin,
      message: req.flash('admin-menu-item-new'),
    });
  });
  app.post('/admin/menu/new', funcs.isLoggedIn, (req, res) => {
    try {

      const item = new MenuItem(req.body);
      item.save(err => {

        if (err){
          throw err;
          res.sendStatus(500);
        }

        console.log('success');
        console.log(item);
        res.redirect('/admin/menu/' + item.id);
      });

    } catch (e) {
      res.sendStatus(418);
    }
  });

  app.get('/admin/menu/:id', funcs.isLoggedIn, (req, res) => {
    MenuItem.find({ id: req.params.id }, (err, item) => {
      if (err) {

        throw err;
        res.sendStatus(500);

      } else if (item) {

        res.render('admin/menu-item.ejs', {
          user: req.session.admin,
          message: req.flash('admin-menu-item'),
          item: item,
        });

      } else {

        req.flash('admin-menu', `Cannot find menu item with id ${req.params.id}`);
        res.redirect('/admin/menu');

      }
    });
  });
  app.get('/admin/menu/:id/edit', funcs.isLoggedIn, (req, res) => {
    MenuItem.find({ id: req.params.id }, (err, item) => {
      if (err) {

        throw err;
        res.sendStatus(500);

      } else if (item) {

        res.render('admin/menu-item/edit.ejs', {
          user: req.session.admin,
          message: req.flash('admin-menu-item-edit'),
          item: item,
        });

      } else {

        req.flash('admin-menu', `Cannot find menu item with id ${req.params.id}`);
        res.redirect('/admin/menu');

      }
    });
  });
  app.post('/admin/menu/:id/edit', funcs.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });
  app.post('/admin/menu/:id/delete', funcs.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

  app.get('/admin/orders', funcs.isLoggedIn, (req, res) => {
    Order.find({}, (err, orders) => {
      res.render('admin/orders.ejs', {
        user: req.session.admin,
        message: req.flash('admin-orders'),
        orders: orders,
      });
    });
  });

  app.get('/admin/orders/:id', funcs.isLoggedIn, (req, res) => {
    Order.find({ id: req.params.id }, (err, order) => {
      if (err) {

        throw err;
        res.sendStatus(500);

      } else if (order) {

        res.render('admin/order.ejs', {
          user: req.session.admin,
          message: req.flash('admin-order'),
        });

      } else {

        req.flash('admin-menu', `Cannot find order with id ${req.params.id}`);
        res.redirect('/admin/orders');

      }
    });
  });

  app.get('/admin/orders/:id/edit', funcs.isLoggedIn, (req, res) => {
    Order.find({ id: req.params.id }, (err, order) => {
      if (err) {

        throw err;
        res.sendStatus(500);

      } else if (order) {

        res.render('admin/order/edit.ejs', {
          user: req.session.admin,
          message: req.flash('admin-order-edit'),
        });

      } else {

        req.flash('admin-menu', `Cannot find order with id ${req.params.id}`);
        res.redirect('/admin/orders');

      }
    });
  });
  app.post('/admin/orders/:id/edit', funcs.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });
  app.post('/admin/orders/:id/delete', funcs.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

  app.get('/menu', (req, res) => {
    MenuItem.find({}, (err, items) => {
      res.render('menu.ejs', {
        user: req.session.admin,
        message: req.flash('menu'),
        items: items,
      });
    });
  });

  app.get('/order/new', (req, res) => {
    res.render('order/new.ejs', {
      user: req.session.admin,
      message: req.flash('order-new'),
    });
  });
  app.post('/order/new', (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });
  app.get('/order/:id', (req, res) => {
    Order.find({ id: req.params.id }, (err, order) => {
      if (err) {

        throw err;
        res.sendStatus(500);

      } else if (order) {

        res.render('order.ejs', {
          user: req.session.admin,
          message: req.flash('order'),
          order: order,
        });

      } else {

        req.flash('admin-menu', `Cannot find order with id ${req.params.id}`);
        res.redirect('/menu');

      }
    });
  });
  app.get('/order/:id/cancel', (req, res) => {
    Order.find({ id: req.params.id }, (err, order) => {
      if (err) {

        throw err;
        res.sendStatus(500);

      } else if (order) {

        res.render('order/cancel.ejs', {
          user: req.session.admin,
          message: req.flash('order-cancel'),
          order: order,
        });

      } else {

        req.flash('admin-menu', `Cannot find order with id ${req.params.id}`);
        res.redirect('/menu');

      }
    });
  });
  app.post('/order/:id/cancel', (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

  /*
  // admin create menu item
  app.get('/admin/create-menu-item', funcs.isLoggedIn, (req, res) => {
    res.render('create-menu-item.ejs', {
      user: req.session.admin,
      message: req.flash('create-menu-item'),
    });
  });
  app.post('/admin/create-menu-item', funcs.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.sendStatus(500);
  });
  */

};
