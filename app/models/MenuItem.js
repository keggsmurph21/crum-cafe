'use strict';

const mongoose = require('mongoose');

const MenuItemSchema = mongoose.Schema({

  id: Number,
  name: String,

  onMenu: Boolean,
  onHold: Boolean,

  cost: Number,
  description: String,
  waitTime: String,
  isVegetarian: Boolean,
  isVegan: Boolean,

});

module.exports = mongoose.model('MenuItem', MenuItemSchema, 'menu-items');
