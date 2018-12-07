'use strict';

const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({

  //id: Number,
  confirmationNumber: Number,

  placedBy: Number,
  placedAt: Date,

  items: [ Number ],
  notes: String,


});

module.exports = mongoose.model('Order', OrderSchema, 'orders');
