const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const transactionRouter = require('./routes/transactionRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)MIDDLEWARES
//Middleware to allow us to see request data in console and limited access with only environment = development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Middleware to access to req.body
app.use(express.json());

app.use((req, res, next) => {
  // console.log('Hello from middleware😁😁😁😁');
  req.requestTime = new Date().toISOString();
  next();
});

// 2)Mounting Routers - routes file
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/users', userRouter);

// 4)Error Handling
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `The URL:${req.originalUrl} can not be found in the server.`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

module.exports = app;
