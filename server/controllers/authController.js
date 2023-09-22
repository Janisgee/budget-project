const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  // Create token for user to signup
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // Check if email and password exist
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError('Please fill in email and password to login.', 401),
    );
  // Check if user exist and password correct
  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user && !(await user.correctPassword(password, user.password)))
    return next(
      new AppError(
        'The email and password are not correct. Please try again.',
        401,
      ),
    );
  // If everything ok, send token to client.
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //Get a token and check if it is there.
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token)
    return next(
      new AppError('You are not login, please login to access.', 401),
    );

  //Verify the token and check if someone manipulate it. or it has been expired.
  const asyncJWTVerify = promisify(jwt.verify);
  const decoded = await asyncJWTVerify(token, process.env.JWT_SECRET);
  console.log(decoded);

  //Check if the user still exist
  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError('The user belonging to this token is no longer exist.', 401),
    );
  //Check if user change its password after the token is issued.
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401),
    );
  }
  //Grand access if everything ok.
  req.user = currentUser;
  next();
});
