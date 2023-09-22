const Transaction = require('./../models/transactionModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

// 2)ROUTE HANDLERS

exports.getAllTransactions = catchAsync(async (req, res) => {
  //Execute Query
  console.log(req.user.id);
  let query;
  if (req.user.role === 'user') {
    query = { userId: req.user.id };
  } else if (req.user.role === 'admin') {
    query = {};
  }
  const features = new APIFeatures(Transaction.find(query), req.query)
    .filter()
    .filterByDate()
    .sort()
    .limitFields()
    .paginate();
  // console.log('features', features, '😁😁😁');
  const transactions = await features.exec();

  // const transactions = await query;

  res.status(200).json({
    message: 'success',
    result: transactions.length,
    data: {
      transactions,
    },
  });
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new AppError('No transaction found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create({
    category: req.body.category,
    date: req.body.date,
    tag: req.body.tag,
    type: req.body.type,
    value: req.body.value,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      transaction: newTransaction,
    },
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!transaction) {
    return next(new AppError('No transaction found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);

  if (!transaction) {
    return next(new AppError('No transaction found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTransactionsStats = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const month = req.params.month * 1;
  const start = new Date(Date.UTC(year, month ? month - 1 : 0));

  const end = new Date(start);
  end.setMonth(start.getMonth() + (month ? 1 : 12));
  console.log(month, start, end);
  const stats = await Transaction.aggregate([
    { $match: { userId: req.user.id } },
    { $match: { type: 'Expense' } },
    {
      $match: {
        date: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: { type: '$type', category: '$category', userId: '$userId' },
        numTransactions: { $sum: 1 },
        sumValue: { $sum: '$value' },
        date: { $push: '$date' },
        value: { $push: '$value' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    result: stats.length,
    data: {
      stats,
    },
  });
});
