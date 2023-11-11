const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const cookieParser = require('cookie-parser');
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)MIDDLEWARES

//Middleware to helps secure Express apps by setting HTTP response headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use('/img/users', express.static('public/img/users'));
//Middleware to allow us to see request data in console and limited access with only environment = development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Middleware to access to req.body(Reading body from body into req.body)
//and limit the body size not bigger than 10kb
app.use(express.json({ limit: '10kb' }));

//Reading data from cookies
app.use(cookieParser());

//Middleware for Rating Limit for each IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, //60mins
  limit: 1000, // 100 requests limit in an hour for each IP
  message: 'Too many requests from same IP, please try again after an hour.',
});

// Expect X-Forwarded-For from production proxy
app.set('trust-proxy', true);
app.use('/api', limiter);

//

//Middleware to santize req.body, req.query and req.params
//Santize any $ and . sign
app.use(mongoSanitize()); //"email":{"$gt":""}
//Santize Any HTTP injection
app.use(xss()); //"name": "&lt;div class='bad request'>Test 3&lt;/div>"

//Testing Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//Middleware(Express) to protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      'name',
      'role',
      'accountCreateAt',
      'userId',
      'category',
      'date',
      'type',
      'value',
    ],
  }),
);

// 2)Mounting Routers - routes file
app.use('/api/v1/admin', adminRouter);
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
