'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

  id: Number,
  username: String,

  firstName: String,
  lastName: String,
  classYear: Number,

  isAdmin: Boolean,

});

module.exports = mongoose.model('User', UserSchema, 'users');
