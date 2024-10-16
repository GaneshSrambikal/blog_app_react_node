const User = require('../models/userModel.js');
const {
  createUserSchema,
  userLoginSchema,
} = require('../validators/userValidator.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'No users.' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res.status(400).json({
      message: 'No Users',
      error: error.message,
    });
  }
};


exports.registerUser = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    // If validation fails, return a 400 Bad Request with the validation message
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, name, gender, email, password, dob, address } = req.body;
    // check if user exists with email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists!.' });
    }
    const user = new User({
      username,
      name,
      gender,
      email,
      password,
      address,
      dob,
    });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      id: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    next(error);
    return res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  // validate the req.body data {email, password}
  const { error } = userLoginSchema.validate(req.body);

  // if error in validation
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // get email and password
  const { email, password } = req.body;
  try {
    // find user
    const user = await User.findOne({ email });
    // User not found
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!.' });
    }
    // if user exist compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    // wrong/mismatch password
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // if email and password are OK generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log('Error logging user', error);
    next();
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// Get User Profile (protected)
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(['-password','-joined']); // -password excludes the password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};
