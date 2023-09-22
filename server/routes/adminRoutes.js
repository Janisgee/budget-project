const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');

// 3)ROUTES
const router = express.Router();

router
  .route('/transaction')
  .get(authController.protect, transactionController.getAllUserTransactions);

router.route('/user').get(userController.getAllUsers);

router
  .route('/user/:userId')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
