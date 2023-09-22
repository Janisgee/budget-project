const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'A user must hava a name.'] },
  role: { type: String, enum: { values: ['admin', 'user'] }, default: 'user' },
  email: {
    type: String,
    required: [true, 'A user must hava an email.'],
    unique: [true, 'This email address has been registered.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please fill in a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'A user must hava a password.'],
    minLength: [8, 'Password length must be at least 8 characters.'],
    maxLength: [20, 'Password length must not be longer than 20 characters.'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must hava a passwordConfirm.'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'PasswordConfirm must be same as password.',
    },
  },
  accountCreateAt: { type: Date, default: new Date().toISOString() },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre(/^findByIdAndUpdate/, async function (next) {
  //TODO
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = new Date();
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = this.passwordChangedAt.getTime() / 1000;
    // console.log(changeTimestamp, JWTTimestamp);
    return JWTTimestamp < changeTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;