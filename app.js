const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/index');
const passport = require('passport');
const app = express();
app.use(passport.initialize());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(errorHandler);
module.exports = app;
