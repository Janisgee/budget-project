//ERROR MIDDLEWARE

const AppError = require('../utils/appError');

const handleJWTExpiredError = (err) => {
  return new AppError('Token has expired. Please login again.', 401);
};

const handleJWTError = (err) => {
  return new AppError('Invalid token. Please login again.', 401);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.keyValue.email;
  const message = `Duplicate field value: ${value}. Please fill in another value.`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${error.join(' ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    err: err,
    stack: err.stack,
    status: err.status,
    message: err.message,
  });
};

const sendErrorProd = (err, res) => {
  //Operational Error : send error message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming error or unknow error: Not leak details.
    //Log Error
    console.error('Error💥💥', err);
    //Send Generic Message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateErrorDB(error);
    if (err.name === 'ValidationError') error = handleValidationError(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};
