'use strict';

const _ = require('underscore');
const params = {

  APP_SECRET: process.env.CC_SECRET || process.env.APP_SECRET || 'fallback',
  PORT: process.env.CC_PORT || process.env.PORT || 6900,
  REGISTER_SECRET: process.env.CC_REGISTER || process.env.REGISTER_SECRET,

};

_.each(params, (value, key) => {

  if (!value)
    throw new Error(`Required application parameter "${key}" not set`);

});

module.exports = params;
