'use strict';

const mongoose = require('mongoose');

const MenuItemSchema = mongoose.Schema({

  id: Number,
  name: String,
  cost: Number,

  isOnMenu: Boolean,
  isAvailable: Boolean,

});

module.exports = mongoose.model('MenuItem', MenuItemSchema, 'menu-items');
