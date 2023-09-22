const express = require('express');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');

const authController = require('../controllers/authController');

// 3)ROUTES

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/').post(userController.createUser);

router
  .route('/transaction')
  .get(authController.protect, transactionController.getAllTransactions)
  .patch(authController.protect, transactionController.updateTransaction)
  .delete(authController.protect, transactionController.deleteTransaction)
  .post(authController.protect, transactionController.createTransaction);

router
  .route('/transaction/stats/:year')
  .get(authController.protect, transactionController.getTransactionsStats);

router
  .route('/transaction/stats/:year/:month')
  .get(authController.protect, transactionController.getTransactionsStats);

module.exports = router;
