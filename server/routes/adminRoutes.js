const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');

// 3)ROUTES
const router = express.Router();

router
  .route('/transactions')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    transactionController.getAllTransactions,
  );

router
  .route('/users')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers,
  );

router
  .route('/users/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser, //TODO
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );
module.exports = router;
