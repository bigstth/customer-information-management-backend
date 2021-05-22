const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    _customer: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model('History', schema);
module.exports = History;
