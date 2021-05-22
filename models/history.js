const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    action: { type: String, required: true, trim: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model('History', schema);
module.exports = History;
