const mongoose = require('mongoose');

//Schema
const transactionSchema = new mongoose.Schema({
  category: {
    type: String,
    default: '💡 Uncategorized',
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
    required: [true, 'A transaction must have a date.'],
  },
  tag: {
    type: String,
    required: [true, 'A transaction must have a tag.'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'A transaction must have a type.'],
  },
  value: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    trim: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
