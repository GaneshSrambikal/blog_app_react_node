const User = require('../models/userModel.js');
const {
  createUserSchema,
  userLoginSchema,
  updateProfileSchema,
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
      return res.status(400).json({ message: 'User not found' });
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
    console.log(req.cookies);
  } catch (error) {
    console.log('Error logging user', error);
    next();
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    req.headers.authorization = undefined;
    res.clearCookie('token');
    console.log(req.headers.authorization);
    res.status(200).json({ message: 'User Logged out' });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Profile Management
// Get User Profile (protected)
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select([
      '-password',
      '-joined',
    ]); // -password excludes the password
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

// PUT update Profile (protected)
exports.updateProfile = async (req, res, next) => {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Fill the missing fields', error: error.message });
  }
  const { name, email, address, dob, gender } = req.body;
  try {
    const user = await User.findById(req.user.id).select([
      '-password',
      '-joined',
    ]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.gender = gender || user.gender;
      user.address = address || user.address;
      user.dob = dob || user.dob;

      const updatedUser = await user.save();

      return res.status(200).json({
        message: 'updated successfully',
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

    // OR can optimized the above code to only update changed fields
    // const updates = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   address: req.body.address,
    //   gender: req.body.gender,
    //   dob: req.body.dob
    // };
    // if (user) {
    //   // Filter out undefined values to only update provided fields
    //   Object.keys(updates).forEach((key) => {
    //     if (updates[key] !== undefined) {
    //       user[key] = updates[key];
    //     }
    //   });
    // }
    // const updatedUser = await user.save();
  } catch (error) {
    console.log(`Error:${error.message}`);
    next(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE remove a user account (protected)
exports.deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (user._id.toString() === req.user.id) {
      await user.deleteOne();
      res.clearCookie('token');
      res.status(200).json({ message: 'user profile deleted and logged out' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(`Error:${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

//Password Management
// Forget Password


