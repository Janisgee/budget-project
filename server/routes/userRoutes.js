const express = require('express');
const userController = require('../controllers/userController');
const transactionRouter = require('./transactionRoutes');
const authController = require('../controllers/authController');

// 3)ROUTES

const router = express.Router();

router.use('/:userId/transaction', transactionRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.get('/me', userController.getMe);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);

router.delete(
  '/deleteAccount',
  authController.restrictTo('user'),
  userController.deleteUser,
);

module.exports = router;
