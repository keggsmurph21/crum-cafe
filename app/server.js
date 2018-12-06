'use strict';

const config = require('./config');
const express = require('express');
const http = require('http');
const router = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = new session.MemoryStore();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(session({
  store: MemoryStore,
  secret: config.APP_SECRET,
  key: 'express.sid',
  saveUninitialized: true,
  resave: false,
}));

app.set('view engine', 'ejs');
app.set('views', 'app/views');

router(app);
app.use(express.static('app/public'));

const server = http.createServer(app).listen(config.PORT, () => {

  console.log(`Express server listening on port ${config.PORT}`);

});
