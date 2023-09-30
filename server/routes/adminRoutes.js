const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');

// 3)ROUTES
const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/transactions').get(transactionController.getAllTransactions);

router.route('/users').get(userController.getAllUsers);

router
  .route('/users/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);
module.exports = router;
