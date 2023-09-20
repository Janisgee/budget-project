const mongoose = require('mongoose');
const slugify = require('slugify');

//Schema
const transactionSchema = new mongoose.Schema({
  category: {
    type: String,
    default: '💡 Uncategorized',
  },
  slug: { type: String },
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

transactionSchema.pre('save', function (next) {
  console.log('Pre Schema');
  this.slug = slugify(this.category, { lower: true });
  next();
});

// transactionSchema.post('save', function (doc, next) {
//   console.log('Post Schema');

//   console.log(doc);
//   next();
// });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
