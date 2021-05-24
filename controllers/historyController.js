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
    const data = histories.map((history) => {
      console.log(history);
      return {
        id: history._id,
        user: history._user.email,
        customer: history._customer
          ? `${history._customer.first_name} ${history._customer.last_name}`
          : null,
        action: history.action,
        createdAt: history.createdAt,
      };
    });
    res.status(200).json({
      data: data,
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
