const User = require('../models/userModel.js');
const { createUserSchema } = require('../validators/userValidator.js');

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

exports.getUserById = async (req, res, next) => {
  try {
    console.log(`single user`);
    return res.send('single user');
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  console.log('gets in controllers');
  try {
    const { error } = createUserSchema.validate(req.body);

    // If validation fails, return a 400 Bad Request with the validation message
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, name, email, password, dob, address } = req.body;
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
