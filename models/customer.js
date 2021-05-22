const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone_number: { type: String, required: true, trim: true },
    date_of_birth: { type: Date, required: true, trim: true },
    weight: { type: Number, required: true, trim: true },
    congenital_disease: { type: String, required: false, trim: true },
    drug_allergy: { type: String, required: false, trim: true },
    symptom: { type: String, required: false, trim: true },
    diagnosis: { type: String, required: false, trim: true },
    caretaker_doctor: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', schema);
module.exports = Customer;
