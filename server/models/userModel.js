const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
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
  photo: { type: String, default: 'default.jpg' },
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
      message: 'Password confirm must be same as password.',
    },
  },
  accountCreateAt: { type: Date, default: new Date().toISOString() },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
});

userSchema.index({ role: 1, email: 1 });

userSchema.pre('save', async function (next) {
  //TODO
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
