'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

const MenuItemSchema = mongoose.Schema({

  //id: Number,
  name: {
    type: String,
    validator: v => !!v,
    message: v => `Invalid name: "${v}"`,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
    get: v => moment(v).fromNow(),
  },
  dateModified: {
    type: Date,
    default: new Date(),
    get: v => moment(v).fromNow(),
  },

  isViewable: {
    type: Boolean,
    default: true,
  },
  isOrderable: {
    type: Boolean,
    default: true,
  },

  cost: {
    type: Number,
    validator: v => /^\$?(\d+(.\d\d)?)/.test(v),
    set: v => {
      v = v.match(/^\$?(\d+(.\d\d)?)/)[1];
      return Number(v);
    },
    message: v => `Invalid name: "${v}"`,
  },
  description: String,
  waitTime: String,
  isVegetarian: {
    type: Boolean,
    set: v => !!v,
  },
  isVegan: {
    type: Boolean,
    set: v => !!v,
  },

});

module.exports = mongoose.model('MenuItem', MenuItemSchema, 'menu-items');

/*
console.log(model);
model.statics.validateAndCreate = function (params, next) {

  if (!params.name)
    return next(new Error('Name cannot be empty'));

  const cost = params.cost.match(/^\$?(\d+(.\d\d)?)/);
  if (!cost)
    return next(new Error('Invalid format: cost'));

  item = new MenuItemSchema({

    name: params.name,
    dateCreated: new Date(),
    dateModified: new Date(),

    isViewable: true,
    isOrderable: true,

    cost: new Number(cost[1]),
    description: params.description,
    waitTime: params.waitTime,
    isVegetarian: !!params.isVegetarian,
    isVegan: !!params.isVegan,

  });

  return next(null, item);
}

module.exports = model;
*/
