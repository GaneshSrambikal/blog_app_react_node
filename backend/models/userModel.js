const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
  },
  title: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  avatar_url: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rewards: {
    type: Number,
    default: 10,
  },
  totalAiCredits: {
    type: Number,
    default: 100,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: undefined,
    trim: true,
  },
  resetPasswordExpire: {
    type: Date,
    default: undefined,
  },
});

// Pre-save middleware for password hashing
userSchema.pre('save', async function (next) {
  //   const user = this;

  // Only hash password if it has been modified or new
  if (this.isModified('password')) {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next(); // after hash proceed to save()
});

// compare the password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

// compile the schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;
