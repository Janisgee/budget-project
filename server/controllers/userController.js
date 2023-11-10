const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/img/users');
//   },
//   filename: (req, file, callback) => {
//     //Set the photo file name (eg.user-789d2738472asd983sd472sd-234234729.jpg)

//     const ext = file.mimetype.split('/')[1];
//     callback(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

//Store the image in buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  //Filter if the uploaded photo is image.
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError('Not an image! Please upload only images.', 400),
      false,
    );
  }
};

//Upload middleware with the destination defined.
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

(exports.uploadUserPhoto = upload.single('photo')),
  function (req, res, next) {
    req.body;
  };

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next;

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

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
  if (req.file) filteredBody.photo = req.file.filename;

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

exports.deleteUser = catchAsync(async (req, res, next) => {
  let query;
  if (req.user.role === 'user') {
    query = req.user.id;
  } else if (req.user.role === 'admin') {
    query = req.params.id;
  }
  await User.findByIdAndUpdate(
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

exports.getMe = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new AppError('User is not logged in yet.', 401));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
