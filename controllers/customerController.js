const Customer = require('../models/customer');
const User = require('../models/user');
const History = require('../models/history');
const { format } = require('date-fns');
const { validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
  const customer = await Customer.find({ status: 'UnSubmit' }).sort({ _id: 1 });
  res.status(200).json({
    data: customer,
  });
};

exports.admin = async (req, res, next) => {
  const customer = await Customer.find({ status: { $ne: 'UnSubmit' } }).sort({
    _id: 1,
  });
  res.status(200).json({
    data: customer,
  });
};

exports.show = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json({
      data: {
        customer,
        date_of_birth: format(new Date(customer.date_of_birth), 'dd/MM/yyyy'),
      },
    });
  } catch (error) {
    error = new Error('Customer not found');
    error.statusCode = 400;
    next(error);
  }
};

exports.submission = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 400;
      throw error;
    }
    const customers = await Customer.updateMany(
      { status: 'UnSubmit' },
      { status: 'Submitted' }
    );
    if (customers.nModified === 0) {
      const error = new Error('Customers not found');
      error.statusCode = 400;
      throw error;
    }

    let history = new History();
    history._user = req.user._id;
    history._customer = null;
    history.action = 'Submission';
    await history.save();
    res.status(200).json({
      message: 'Successful Submission',
    });
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 400;
      throw error;
    }
    const customer = await Customer.findOneAndUpdate(
      { _id: req.body.id },
      { status: req.body.status }
    );
    let history = new History();
    history._user = req.user._id;
    history._customer = customer._id;
    history.action = 'Change Status';
    await history.save();
    res.status(200).json({
      message: 'Successful Change Status',
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const customer = await Customer.deleteOne({ _id: req.params.id });
    if (customer.deletedCount === 0) {
      throw new Error('Customer not found');
    }
    res.status(200).json({
      message: 'Customer has been deleted',
    });
  } catch (error) {
    error = new Error('Customer not found');
    error.statusCode = 400;
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      weight,
      congenital_disease,
      drug_allergy,
      symptom,
      diagnosis,
      caretaker_doctor,
    } = req.body;
    const customer = await Customer.updateOne(
      { _id: req.params.id },
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        date_of_birth: date_of_birth,
        weight: weight,
        congenital_disease: congenital_disease,
        drug_allergy: drug_allergy,
        symptom: symptom,
        diagnosis: diagnosis,
        caretaker_doctor: caretaker_doctor,
      }
    );
    if (customer.nModified === 0) {
      throw new Error('Customer not found');
    }
    let history = new History();
    history._user = req.user._id;
    history._customer = req.params.id;
    history.action = 'Update Customer';
    await history.save();
    res.status(200).json({
      message: 'Successful update',
    });
  } catch (error) {
    error = new Error('Customer not found');
    error.statusCode = 400;
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Input data error');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const {
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      weight,
      congenital_disease,
      drug_allergy,
      symptom,
      diagnosis,
      caretaker_doctor,
    } = req.body;

    let customer = new Customer();
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.email = email;
    customer.phone_number = phone_number;
    customer.date_of_birth = date_of_birth;
    customer.weight = weight;
    customer.congenital_disease = congenital_disease || null;
    customer.drug_allergy = drug_allergy || null;
    customer.symptom = symptom || null;
    customer.diagnosis = diagnosis || null;
    customer.caretaker_doctor = caretaker_doctor || null;
    customer.status = 'UnSubmit';

    await customer.save(async (err, customer) => {
      let history = new History();
      history._user = req.user._id;
      history._customer = customer._id;
      history.action = 'Create Customer';
      await history.save();
      res.status(201).json({
        message: 'Succesful Create Customer',
        data: customer,
      });
    });
  } catch (error) {
    next(error);
  }
};
