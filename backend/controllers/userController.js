const crypto = require('crypto');
const User = require('../models/userModel.js');
const {
  createUserSchema,
  userLoginSchema,
  updateProfileSchema,
  emailSchema,
  passwordResetSchema,
  passwordChangeSchema,
  objectIdSchema,
} = require('../validators/userValidator.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail.js');

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
  // console.log(`${req.protocol}://${req.get(`host`)}`);
  // if error in validation
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // get email and password
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    // find user
    const user = await User.findOne({ email }).select('+password');
    // console.log(user);
    // User not found
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email / Password' });
    } else {
      // if user exist compare the password
      // const isMatch = await user.comparePassword(password);
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(isMatch);
      // wrong/mismatch password
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      // if email and password are OK generate JWT Token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
          dob: user.dob,
          gender: user.gender,
          joined: user.joined,
          address: user.address,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );
      console.log(token);
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    }
  } catch (error) {
    console.log('Error logging user', error);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    // req.headers.authorization = undefined;
    // res.clearCookie('token');
    // console.log(req.headers.authorization);
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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
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
// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const { error } = emailSchema.validate(req.body);

  if (error) {
    return res
      .status(404)
      .json({ message: 'Validation error', error: error.message });
  }
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `No User found with email: ${email}` });
    } else {
      // Generate password reset token
      const resetToken = crypto.randomBytes(20).toString('hex');

      // set token and expiration on user document
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token expires in 30 minutes
      await user.save();

      // send reset token via email
      const resetUrl = `${req.protocol}://${req.get(
        `host`
      )}/api/users/reset-password/${resetToken}`;
      const message = `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`;

      // send email
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        text: message,
        html: `<h1>You requested a password reset. Please click the following link to reset your password: <a href=${resetUrl}>reset password</a></h1>`,
      });

      return res.status(200).json({
        message: 'Password reset link sent to email.',
        link: resetUrl, // only for developer mode
        resetToken: resetToken, // only for developer mode
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { error } = passwordResetSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation error', error: error.message });
  }
  const token = req.params.token;
  const { password } = req.body;
  console.log(password);
  try {
    // find the user with same token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'Password reset expired.' });
    } else {
      // set password and unset token ,expired
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      // save user. password will be hashed at model level
      await user.save();
      return res
        .status(200)
        .json({ message: 'Password has been reset successfully' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

exports.changePassword = async (req, res, next) => {
  const { error } = passwordChangeSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  const { password, currentPassword } = req.body;
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    } else {
      // compare password : defined at Model
      const isMatch = await user.comparePassword(currentPassword);
      console.log(isMatch);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Current password is incorrect' });
      }
      // set password to document
      user.password = password;
      // save document
      await user.save();
      return res.status(200).json({ message: 'Password changed.' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// User Interactions:
// Following and Followers management

// Follow another
exports.followUser = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: `ObjectId Error`, error: error.message });
  }
  let message = '';
  try {
    // find the user with id
    const user = await User.findById(req.params.id).select('-password');
    // if not found
    if (!user) {
      message = 'User not found!';
      return res.status(404).json({ message });
    }
    // check if current user exists in the user followers list
    if (!user.followers.includes(req.user.id)) {
      // push the current user id to followers list
      user.followers.push(req.user.id);
      // save document
      await user.save();

      // set following user in current user
      const currentUser = await User.findById(req.user.id).select('-password');
      if (!currentUser.following.includes(req.params.id)) {
        currentUser.following.push(req.params.id);
        await currentUser.save();
      }
      return res.status(200).json({ message: `Following user: ${user.id}` });
    } else {
      message = 'Already following';
      return res.status(200).json({ message: message });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Unfollow user
exports.unFollowUser = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: `ObjectId Error`, error: error.message });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.followers.includes(req.user.id)) {
      const followers = user.followers.filter(
        (follower) => follower.toString() !== req.user.id
      );
      user.followers = followers;
      await user.save();

      const currentUser = await User.findById(req.user.id);
      if (currentUser.following.includes(req.params.id)) {
        const following = currentUser.following.filter(
          (following) => following.toString() !== req.params.id
        );
        currentUser.following = following;
        await currentUser.save();
      }
      return res
        .status(200)
        .json({ message: `UnFollowed user ${req.params.id}` });
    } else {
      return res.status(200).json({ message: 'Already unfollowed.' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// List Followers
exports.listFollowers = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: `ObjectId Error`, error: error.message });
  }
  try {
    // search the user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!.' });
    }
    const listFollowers = (await user.populate('followers', 'name email'))
      .followers;
    return res.status(200).json({ followers: listFollowers });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

exports.listFollowing = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: `ObjectId Error`, error: error.message });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const listFollowing = (await user.populate('following', 'name email'))
      .following;
    return res.status(200).json({ following: listFollowing });
  } catch (error) {
    console.log(error.message);
    next(error);
    return res
      .status(500)
      .json({ message: 'server error', error: error.message });
  }
};
