'use strict';

const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

module.exports = app => {

  // index page
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  // login/logout pages
  app.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  app.post('/login', (req, res) => {

    console.log('POSTING TO LOGIN');
    console.log(req.body);
    res.redirect('/');

  });

  app.post('/logout', (req, res) => {

    console.log('POSTING TO LOGOUT');
    console.log(req.body);
    res.redirect('/');

  });

  // admin page
  app.get('/admin', (req, res) => {

    MenuItem.find({}, (err, items) => {

      if (err)
        throw err;

      res.render('admin.ejs', { items: items });

    });

  });

  // API routes
  app.post('/api/login', (req, res) => {

  });

  app.post('/api/logout', (req, res) => {

  });

};
