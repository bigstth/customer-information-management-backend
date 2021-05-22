const History = require('../models/history');

exports.index = async (req, res, next) => {
  try {
    const histories = await History.find()
      .populate({
        path: '_user',
        select: 'email -_id',
      })
      .populate({
        path: '_customer',
        select: 'first_name last_name -_id',
      })
      .exec();
    res.status(200).json({
      data: histories,
    });
    // if (!histories) {
    //   throw new Error('No Data');
    // }
    // res.status(200).json({
    //   message: 'Successful Fetch Histories',
    //   data: histories,
    // });
  } catch (error) {
    next(error);
  }
};
