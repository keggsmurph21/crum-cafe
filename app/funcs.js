'use strict';

/*
const config = require('./config');
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.APP_SECRET, (err, decoded) => {

      if (err)
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });

      // if everything is good, save to request for use in other routes
      req.token = decoded;
      next();

    });

  } else {

    // if there is no token return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }


}
*/

function isLoggedIn(req, res, next) {

  if (req.session.admin)
    return next();

  req.flash('login', 'You must log in to view this page');
  res.redirect('/admin/login');
}

function isLoggedOut(req, res, next) {

  if (!req.session.admin)
    return next();

  req.flash('admin', 'You\'re already logged in!');
  res.redirect('/admin');
}

module.exports = {

  //authenticate,
  isLoggedIn,
  isLoggedOut,

};
