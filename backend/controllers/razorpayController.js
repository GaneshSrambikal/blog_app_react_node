const rp1 = require('../config/razorpay');
const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
exports.initialOrders = async (req, res, next) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Bad request. Please Provide order details.' });
  }
  try {
    const options = req.body;
    const orders = await rp1.orders.create(options);
    if (!orders) {
      return res
        .status(400)
        .json({ message: 'Failed to place order. Bad request' });
    }
    // console.log(orders);
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
    console.log(error);
    return res.status(400).send(error);
  }
};

exports.validateRazPayment = async (req, res, next) => {
  
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest('hex');

    if (digest !== razorpay_signature) {
      return res
        .status(400)
        .json({ message: 'Transaction not legit', isValid: false });
    }
    // Save the payment records to db
    const user = await User.findById(req.user.id).select('-password');
    const newPayment = new Payment({
      paymentId: razorpay_payment_id,
      noOfCredits: 100,
      userId: user._id,
      userEmail: user.email,
      platform: 'razorpay',
    });
    const savedPayment = await newPayment.save();

    // update user credits after purchase
    const newCredit = user?.totalAiCredits ? user.totalAiCredits + 100 : 100;
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        totalAiCredits: newCredit,
      },
      { new: true }
    );

    // console.log('updatedUser', updateUser);
    return res.json({
      message: 'Transaction is legit',
      orderId: razorpay_order_id,
      isValid: true,
      savedPayment: savedPayment,
    });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
