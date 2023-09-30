const mongoose = require('mongoose');
const slugify = require('slugify');

//Schema
const transactionSchema = new mongoose.Schema({
  userId: String,
  category: {
    type: String,
    default: '💡 Uncategorized',
  },
  slug: { type: String },
  date: {
    type: Date,
    default: new Date().toISOString(),
    required: [true, 'A transaction must have a date.'],
    min: [
      Date.UTC('2020'),
      'A transaction date must not older than year 2020.',
    ],
    max: [Date.UTC('2300'), 'A transaction date must not more than year 2300.'],
  },
  tag: {
    type: String,
    required: [true, 'A transaction must have a tag.'],
    trim: true,
    maxLength: [30, 'A transaction note must have less than 20 words.'],
  },
  type: {
    type: String,
    required: [true, 'A transaction must have a type.'],
    enum: {
      values: ['Expense', 'Income'],
      message: 'A transaction is either: "Expense" or "Income".',
    },
  },
  value: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    trim: true,
    maxLength: [50, 'A transaction note must have less than 40 words.'],
  },
});

//index for transaction model
transactionSchema.index({ userId: 1 });
transactionSchema.index({ date: -1, slug: 1 });

//DOCUMENT MIDDLEWARE
transactionSchema.pre('save', function (next) {
  console.log('Pre Schema');
  this.slug = slugify(this.category, { lower: true });
  next();
});

// QUERY MIDDLEWARE

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
