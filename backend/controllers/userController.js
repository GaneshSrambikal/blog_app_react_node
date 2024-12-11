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
const { getRandomAvatarbyGender } = require('../utils/constants/avatars.js');

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
  // console.log(email, password);
  try {
    // find user
    const user = await User.findOne({ email }).select('+password');

    // User not found
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email / Password' });
    } else {
      // if user exist compare the password
      // const isMatch = await user.comparePassword(password);
      const isMatch = await bcrypt.compare(password, user.password);

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
    // next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store');
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
    const user = await User.findById(req.user.id).select(['-password', '-__v']); // -password excludes the password
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
// Get Users Profile by id (protected)
exports.getUsersProfile = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({
      message: `Entered an invalid user id. Please check and try again`,
      error: error.message,
    });
  }
  try {
    const user = await User.findById(req.params.id).select([
      '-password',
      '-__v',
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
  const { name, address, dob, gender, title, about } = req.body;
  try {
    const user = await User.findById(req.user.id).select([
      '-password',
      '-followers',
      '-following',
    ]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user) {
      user.name = name || user.name;
      user.gender = gender || user.gender;
      user.address = address || user.address;
      user.dob = dob || user.dob;
      user.title = title;
      user.about = about;

      const updatedUser = await user.save();

      return res.status(200).json({
        message: 'updated successfully',
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          address: updatedUser.address,
          gender: updatedUser.gender,
          dob: updatedUser.dob,
          title: updatedUser.title,
          about: updatedUser.about,
          username: updatedUser.username,
          joined: updatedUser.joined,
          avatar_url: updatedUser.avatar_url,
          followers: updatedUser.followers,
          following: updatedUser.following,
        },
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
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

// Upload Profile Avatar
exports.uploadAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    user.avatar_url = req.file.path;
    const newData = await user.save();
    return res.status(200).json({
      message: 'File Upload successfully',

      profieAvatarUrl: req.file.path,
      user: {
        _id: newData.id,
        name: newData.name,
        username: newData.username,
        email: newData.email,
        address: newData.address,
        gender: newData.gender,
        dob: newData.dob,
        avatar_url: newData.avatar_url,
        title: newData.title,
        about: newData.about,
        joined: newData.joined,
        following: newData.following,
        followers: newData.followers,
        totalAiCredits: newData.totalAiCredits,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Failed to upload profile picture.',
      error: error.message,
    });
  }
};

// Generate Random Avatar
exports.generateAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar_url = getRandomAvatarbyGender(user.gender);
    const newData = await user.save();
    return res.status(200).json({
      message: 'File Upload successfully',
      user: {
        _id: newData.id,
        name: newData.name,
        username: newData.username,
        email: newData.email,
        address: newData.address,
        gender: newData.gender,
        dob: newData.dob,
        avatar_url: newData.avatar_url,
        title: newData.title,
        about: newData.about,
        joined: newData.joined,
        followers: newData.followers,
        following: newData.following,
        totalAiCredits: newData.totalAiCredits,
      },
    });
  } catch (error) {
    console.log(error);
    next();
    return res.status(500).json({
      message: 'Failed to upload profile picture.',
      error: error.message,
    });
  }
};

// Get users current avatar
exports.getUserCurrentAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    } else {
      const userAvatar = user.avatar_url;
      return res.status(200).json({ avatar_url: userAvatar });
    }
  } catch (error) {
    // next(error);
    return res.status(500).json({
      message: 'Failed to fetch user avatar',
      error: error.message,
    });
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
    const listFollowers = (
      await user.populate('followers', 'name title avatar_url')
    ).followers;
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
    const listFollowing = (
      await user.populate('following', 'name title avatar_url')
    ).following;
    return res.status(200).json({ following: listFollowing });
  } catch (error) {
    console.log(error.message);
    next(error);
    return res
      .status(500)
      .json({ message: 'server error', error: error.message });
  }
};

// Update users ai credits after every ai generated content
exports.updateCredits = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        totalAiCredits: req.user.totalAiCredits - 20,
      },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: 'Credit updated successfully', user });
  } catch (error) {
    console.log(error);
    next(error);
    res
      .status(500)
      .json({ message: 'Failed to update credits', error: error.message });
  }
};

// Update user rewards based of reward type ex. [like | comment | blog]
exports.updateRewards = async (req, res, next) => {
  let updatedUser = {};
  let typeOfRewards = ['like', 'comment', 'blog'];
  const { rewardType } = req.body;
  if (!rewardType) {
    return res.status(400).json({ message: 'Please provide reward type.' });
  }
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(400).json({ message: 'User not found.' });
  }
  if (!typeOfRewards.includes(rewardType)) {
    res.status(400).json({
      message:
        'Please provide a correct reward type. ex. [like | comment | blog]',
    });
  }
  try {
    switch (rewardType) {
      case 'blog':
        updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { rewards: user.rewards + 10 },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: 'Rewards updated successfully.', updatedUser });

      case 'like':
        updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { rewards: user.rewards + 1 },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: 'Rewards updated successfully.', updatedUser });

      case 'comment':
        updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { rewards: user.rewards + 5 },
          { new: true }
        );
        return res.status(200).json({
          message: 'Rewards updated successfully.',
          updatedUser,
        });

      default:
        break;
    }
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.redeemCredits = async (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({ message: 'No user found, unauthorized.' });
  }
  const user = await User.findById(req.user._id).select('-password');

  let rewards = user?.rewards;
  if (rewards < 100) {
    return res.status(400).json({ message: 'Not enough rewards to redeem' });
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          rewards: user.rewards - 100,
          totalAiCredits: user.totalAiCredits + 100,
        },
        { new: true }
      );
      return res.status(200).json({
        message: 'Reward Redeemed',
        updatedUser: {
          rewards: updatedUser.rewards,
          totalAiCredits: updatedUser.totalAiCredits,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
};
