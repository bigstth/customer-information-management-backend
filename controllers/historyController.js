const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
exports.index = async (req, res, next) => {
  const UserList = await User.find();
  console.log(UserList);
  const data = UserList.map((user) => {
    return {
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };
  });
  res.status(200).json({ data });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('Wrong username or password');
      error.statusCode = 401;
      throw error;
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error('Wrong username or password');
      error.statusCode = 401;
      throw error;
    }
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: '7 days' }
    );

    const expireDate = jwt.decode(token);

    res.status(200).json({
      auth_token: token,
      expires_in: expireDate.exp,
      token_type: 'Bearer',
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  res.status(200).json({ message: 'logout' });
};

exports.register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Input data error');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error('Email has been used');
      error.statusCode = 400;
      throw error;
    }
    let user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = await user.encryptPassword(password);
    await user.save();
    res.status(201).json({
      message: 'Successful register',
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  const { _id, first_name, last_name, email, role, created_at } = req.user;
  res.status(200).json({
    id: _id,
    full_name: `${first_name} ${last_name}`,
    email,
    role,
    created_at,
  });
};
