const User = require('./../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filteredObj = (obj, ...allowedObject) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedObject.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //Create Error if password is in the field
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for updating password. Please go to /updatePassword to do this action.',
        400,
      ),
    );
  }
  //Filtered the unwanted fields except 'name' & 'email'
  const filteredBody = filteredObj(req.body, 'email', 'name');

  //Update the field
  const newUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  //Response from server
  res.status(200).json({
    status: 'success',
    user: newUser,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    //TODO
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      oldPassword: req.body.oldPassword,
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

exports.deleteUser = catchAsync(async (req, res, next) => {
  let query;
  if (req.user.role === 'user') {
    query = req.user.id;
  } else if (req.user.role === 'admin') {
    query = {};
  }
  const user = await User.findByIdAndUpdate(
    query,
    { active: false },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
