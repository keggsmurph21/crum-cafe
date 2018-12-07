'use strict';

const mongoose = require('mongoose');
const prompt = require('prompt-sync')({
  autocomplete: () => {},
});

function getEnvOrPrompt(name, fallback) {

  let value = process.env[name];
  if (!value)
    value = prompt(`${name} (leave blank for default): `);

  return value || fallback;
}

const db_uri = getEnvOrPrompt('DB_URI', 'ds127954.mlab.com:27954/crumb-cafe');
const db_user = getEnvOrPrompt('DB_USER', 'admin');
const db_pass = getEnvOrPrompt('DB_PASS', '');
const db_path = `mongodb://${db_user}:${db_pass}@${db_uri}`;
const db_opts = {
  useNewUrlParser: true,
};

mongoose.connect(db_path, db_opts)
