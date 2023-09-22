const User = require('./../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

// 2)ROUTE HANDLERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .filterByDate()
    .sort()
    .limitFields()
    .paginate();
  // console.log('features', features, '😁😁😁');
  const users = await features.exec();

  if (!users)
    return next(new AppError('No user found in this application.', 404));

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(502).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    //TODO
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: new Date(),
    },
    { new: true, runValidators: true },
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = (req, res) => {
  res.status(502).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
