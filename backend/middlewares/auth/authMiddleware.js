const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];
      // verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // add user from payload
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log('Not authorized');
      next(error);
      return res
        .status(403)
        .json({ message: 'not authorized', errors: error.message });
    }
  }
  if (!token) {
    return res.status(403).json({ message: 'Not authorized' });
  }
};

module.exports = { protect };
