const express = require('express');
const transactionController = require('./../controllers/transactionController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(
  authController.protect,
  authController.restrictTo('user'),
  transactionController.setUserParams,
);

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router.route('/stats').get(transactionController.getTransactionsStats);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
