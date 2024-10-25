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
      console.log('docoded token =>', decoded);
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

      res
        .status(401)
        .json({ message: 'not authorized', errors: error.message });
    }
  } else {
    res.status(404).json({ message: 'Not authorized, token missing' });

    return;
  }
};

module.exports = { protect };
