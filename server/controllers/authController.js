const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    secure: false,
    httpOnly: true,
  };

  if (process.env === 'production') {
    cookiesOptions.secure = true;
  }

  user.password = undefined;

  res.cookie('jwtBudget', token, cookiesOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Create token for user to signup
  createSendToken(newUser, 201, res);
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
  // console.log(user);

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(
      new AppError(
        'The email and password are not correct. Please try again.',
        401,
      ),
    );
  // If everything ok, send token to client.
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwtBudget', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  //Get a token and check if it is there.
  let token;
  console.log(req.headers.authorization);
  console.log(req.cookies);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwtBudget) {
    token = req.cookies.jwtBudget;
  }

  if (!token)
    return next(
      new AppError('You are not login, please login to access.', 401),
    );

  //Verify the token and check if someone manipulate it. or it has been expired.
  const asyncJWTVerify = promisify(jwt.verify);
  const decoded = await asyncJWTVerify(token, process.env.JWT_SECRET);

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
  res.locals.user = currentUser;

  next();
});

//Middleware to check if user has been logged in
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next();

    if (currentUser.changePasswordAfter(decoded.iat)) {
      return next();
    }

    res.locals.user = currentUser;
    return next();
  }
  if (req.cookies.jwt === 'Logged out!') {
    return next();
  }
  next();
});

exports.restrictTo = (...roles) => {
  //below function can access to roles as closure
  return (req, res, next) => {
    // This is middleware function
    //roles ['admin','lead-guide']. role='user'
    //403 - forbidden
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async function (req, res, next) {
  //Get user base on Posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError(
        'No user found with this email. Please fill in a valid email.',
        404,
      ),
    );
  //create token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  console.log(resetToken);
  // Send token to user
  const resetTokenUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetTokenUrl}.\nIf you didn't forget your passoword, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);

    return next(
      new AppError(
        'There was an error sending the email. Please try again.',
        500,
      ),
    );
  }
});

exports.resetPassword = async function (req, res, next) {
  //Get user from receive resetToken (plan token)
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log(user);
  //If token not expired and user is exist, reset password.

  if (!user) {
    return next(
      new AppError('The token has been expired. Please try again later.', 404),
    );
  }

  try {
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    //Update the passwordChangeAt
    user.save();

    //Log user in and send new JWT
    createSendToken(user, 200, res);

    // const token = signToken(user.id);

    // res.status(200).json({
    //   status: 'success',
    //   message: 'The new password has been reset.',
    //   token,
    // });
  } catch (err) {
    user.password = undefined;
    user.passwordConfirm = undefined;
    return next();
  }
};

exports.updatePassword = catchAsync(async function (req, res, next) {
  //Get user from collection
  const user = await User.findById(req.user).select('+password');

  //Check if posted current password is correct
  if (
    !user ||
    !(await user.correctPassword(req.body.currentPassword, user.password))
  ) {
    return next(
      new AppError('Current password is not correct. Please try again!', 401),
    );
  }

  //if correct, update the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = Date.now();
  await user.save();

  //log in and send new JWT
  createSendToken(user, 200, res);

  // const token = signToken(user.id);

  // res.status(200).json({
  //   status: 'success',
  //   message: 'New password has been updated.',
  //   token,
  // });
});
