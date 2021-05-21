const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone_number: { type: String, required: true, trim: false },
  date_of_birth: { type: Date, required: true, trim: true },
  weight: { type: Number, required: true, trim: true },
  congenital_disease: { type: String, required: true, trim: false },
  drug_allergy: { type: String, required: true, trim: false },
  symptom: { type: String, required: true, trim: false },
  diagnosis: { type: String, required: true, trim: false },
  caretaker_doctor: { type: String, required: true, trim: false },
  status: { type: String, required: true, trim: false },
  created_at: { type: String, default: Date.now, required: true, trim: true },
  updated_at: { type: Date, required: true, trim: false },
});

const Customer = mongoose.model('Customer', schema);
module.exports = Customer;
