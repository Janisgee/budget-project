const Transaction = require('./../models/transactionModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

// 2)ROUTE HANDLERS

exports.setUserParams = (req, res, next) => {
  req.user.id = req.params.userId;
  next();
};

exports.getAllTransactions = catchAsync(async (req, res) => {
  //Execute Query
  console.log(req.user.role);
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
  const type = req.query.type;

  const query = [];

  if (req.query.start && req.query.end) {
    const start = new Date(req.query.start);
    const end = new Date(req.query.end);
    query.push({
      $match: {
        date: {
          $gte: start,
          $lt: end,
        },
      },
    });
  }

  if (req.query.type) {
    query.push({ $match: { type } });
  }

  const stats = await Transaction.aggregate([
    ...query,
    { $match: { userId: req.user.id } },
    {
      $group: {
        _id: { category: '$category', type: '$type' },
        numTransactions: { $count: {} },
        sumValue: { $sum: '$value' },
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
