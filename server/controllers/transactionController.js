const Transaction = require('./../models/transactionModel');

exports.listTransactions = async (req, res, next) => {
  const start = req.query.start;
  const end = req.query.end;
  console.log(start, end);

  const listRange = Transaction.find({ date: { $gte: start, $lte: end } });

  const transactions = await listRange;
};

// 2)ROUTE HANDLERS
exports.getAllTransactions = async (req, res) => {
  try {
    //1A) FILTERING
    //Build Query
    console.log(req.query);

    const queryObj = { ...req.query };
    const excludedFields = ['start', 'end', 'page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    //1B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    let query = Transaction.find(JSON.parse(queryStr));

    //1C) LIST RANGE FILTERING BY DATE
    if (req.query.start && req.query.end) {
      const start = req.query.start;
      const end = req.query.end;
      console.log(start, end);

      const filterRange = { date: { $gte: start, $lte: end } };

      query = query.find(filterRange);
    }

    //2) SORTING

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-date');
    }

    //3) LIMITING FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) PAGINATION
    const page = req.query.page * 1 || 1; //Default page 1
    const limit = req.query.limit * 1 || 100; //Default 100 results per page
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTransactions = await Transaction.countDocuments();
      if (skip >= numTransactions) throw new Error('This page does not exist.');
    }

    //Execute Query
    const transactions = await query;

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
