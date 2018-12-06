'use strict';

const funcs = require('./funcs');

const MenuItem = require('./models/MenuItem');
const Student = require('./models/Student');

module.exports = (app, passport) => {

  // index page
  app.get('/', (req, res) => {
    res.render('index.ejs', {
      user: req.session.admin,
      message: req.flash('index-message'),
    });
  });

  // admin login pages
  app.get('/admin/login', funcs.isLoggedOut, (req, res) => {
    res.render('login.ejs', {
      user: req.session.admin,
      message: req.flash('login-message'),
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
    res.render('register.ejs', {
      user: req.session.admin,
      message: req.flash('register-message'),
    });
  });
  app.post('/admin/register', passport.authenticate('web-register', {

    successRedirect: '/admin',
    failureRedirect: '/admin/register',
    failureFlash: true,

  }));

  // admin home page
  app.get('/admin', funcs.isLoggedIn, (req, res) => {
    MenuItem.find({}, (err, items) => {

      if (err)
        throw err;

      Student.find({}, (err, students) => {

        if (err)
          throw err;

        res.render('admin.ejs', {
          user: req.session.admin,
          items: items,
          students: students,
          message: req.flash('admin-message'),
        });

      });
    });
  });

};
