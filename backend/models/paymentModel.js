const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  noOfCredits: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userEmail: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
