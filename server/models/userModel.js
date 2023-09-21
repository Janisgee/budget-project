const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'A user must hava a name.'] },
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
});

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword,
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
