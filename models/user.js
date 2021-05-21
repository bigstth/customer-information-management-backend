const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  password: { type: String, required: true, trim: true, minlength: 3 },
  role: { type: String, required: true, trim: true, default: 'member' },
  created_at: { type: String, default: Date.now, required: true, trim: true },
});

schema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

schema.methods.checkPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

const User = mongoose.model('User', schema);
module.exports = User;
