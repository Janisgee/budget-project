const Transaction = require('./../models/transactionModel');
const APIFeatures = require('./../utils/APIFeatures');

// 2)ROUTE HANDLERS
exports.getAllTransactions = async (req, res) => {
  try {
    //Execute Query
    const features = new APIFeatures(Transaction.find(), req.query)
      .filter()
      .filterByDate()
      .sort()
      .limitFields()
      .paginate();
    console.log('features', features, '😁😁😁');
    const transactions = await features.exec();

    // const transactions = await query;

    res.status(200).json({
      message: 'success',
      result: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        transaction: newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTransactionsStats = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const month = req.params.month * 1;
    const start = new Date(Date.UTC(year, month ? month - 1 : 0));

    const end = new Date(start);
    end.setMonth(start.getMonth() + (month ? 1 : 12));
    console.log(month, start, end);
    const stats = await Transaction.aggregate([
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
          _id: { type: '$type', category: '$category' },
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
