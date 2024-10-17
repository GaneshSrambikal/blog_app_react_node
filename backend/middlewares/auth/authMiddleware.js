const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

// Protect route with jwt token
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
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'user not found, not authorized' });
      }
      next();
    } catch (error) {
      console.log('Not authorized');
      next(error);
      return res
        .status(403)
        .json({ message: 'not authorized', errors: error.message });
    }
  } else {
    return res.status(403).json({ message: 'Not authorized, token missing' });
  }
};

module.exports = { protect };
