const express = require('express');
const transactionController = require('../controllers/transactionController');
const authController = require('./../controllers/authController');

// app.get('/api/v1/transactions', getAllTransactions);
// app.get('/api/v1/transactions/:id', getTransaction);
// app.post('/api/v1/transactions', createTransaction);
// app.patch('/api/v1/transactions/:id', updateTransaction);
// app.delete('/api/v1/transactions/:id', deleteTransaction);

// 3)ROUTES
const router = express.Router();

router.route('/getStats/:year').get(transactionController.getTransactionsStats);

router
  .route('/getStats/:year/:month')
  .get(transactionController.getTransactionsStats);

router
  .route('/')
  .get(authController.protect, transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
