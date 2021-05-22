const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/index');
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
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
