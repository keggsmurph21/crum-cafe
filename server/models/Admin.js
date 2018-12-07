'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const AdminSchema = mongoose.Schema({

  username: String,
  password: String,

});

AdminSchema.methods.generateHash = function (password) {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt, null);
}

AdminSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Admin', AdminSchema, 'admins');
