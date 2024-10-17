const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminLoginSchema } = require('../validators/adminVaildator');

// exports.createAdminUser = async (req, res, next) => {
//   if (req.user && req.user.email !== process.env.SUPER_ADMIN) {
//     return res
//       .status(403)
//       .json({ message: 'Unauthorized to access this api.' });
//   } else {
//     const { error } = createAdminSchema.validate(req.body);
//     if (error) {
//       return res
//         .status(400)
//         .json({ message: 'Validation Error', error: error.message });
//     }
//     const { username, name, address, gender, dob, isAdmin, email, password } =
//       req.body;

//     try {
//       // check if user exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res
//           .status(400)
//           .json({ message: `User exists with email id: ${email}` });
//       }else{
//         const adminUser = new User({
//           username,
//           name,
//           email,
//           password,
//           gender,
//           address,
//           dob,
//           isAdmin,
//         });
//         await adminUser.save();
//         return res.status(201).json({
//           message: 'admin user created successfully',
//           _id: adminUser._id,
//           email: adminUser.email,
//           isAdmin: adminUser.isAdmin,
//         });
//       }

//     } catch (error) {
//       console.log(`Error: ${error.message}`);
//       next(error);
//       return res
//         .status(500)
//         .json({ message: 'Server error', error: error.message });
//     }
//   }
// };

exports.adminLogin = async (req, res, next) => {
  const { error } = adminLoginSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Email or Password!.' });
      }
      if (!user.isAdmin) {
        return res.status(400).json({ message: 'Not an admin user.' });
      }
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

      return res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          isAdmin: true,
        },
      });
    } else {
      return res.status(404).json({ message: 'user not found.' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};
