const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');

const generateToken = (userid) => {
  const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = generateToken(newUser._id);

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
      token: token,
    },
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if the email and the password
  if (!email || !password) {
    return next(new AppError('Email and Password are required!'), 400);
  }

  // 2. check if the user exists, and the password is correct
  const user = await User.findOne({ email: email });

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Email or password incorrect', 400));
  }

  // 3. generate token send it to the client
  const token = generateToken(user._id);

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
      token: token,
    },
  });
});
