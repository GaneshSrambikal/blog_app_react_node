const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/users/userRoutes');
const adminRouter = require('./routes/users/adminRoutes');
const blogRouter = require('./routes/blog/blogRoutes');
const razorpayRouter = require('./routes/payment/razorpay/razorpayRoutes');
const { allowedOrigins } = require('./utils/constants/corsOrigins');
const app = express();

app.use(express.json());
// Middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.get('/api', (req, res) => {
  res.send('Blog app react + node api @GITHUB/GANESHSRAMBIKAL');
});

// Admin User Routes
app.use('/api/admin', adminRouter);
// User Routes
app.use('/api/users', userRouter);
// Blog routes
app.use('/api/blogs', blogRouter);
// Razorpay routes
app.use('/api/payment/razorpay', razorpayRouter);

module.exports = app;
