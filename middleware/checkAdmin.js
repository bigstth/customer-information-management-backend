module.exports.isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      const error = new Error(`You don't have permission to access`);
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
