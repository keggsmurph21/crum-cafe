'use strict';

const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({

  studentID: Number,
  username: String,
  firstName: String,
  lastName: String,
  classYear: Number,

  orders: {

    queued: [ Number ],
    done: [ Number ],

  },

});

module.exports = mongoose.model('Student', StudentSchema, 'students');
