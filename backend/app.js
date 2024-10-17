const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/users/userRoutes');
const adminRouter = require('./routes/users/adminRoutes');
// Middleware setup
// app.use(cors());
app.use(morgan('dev'));
app.use(require('express').json());

// Routes
app.get('/', (req, res) => {
  res.send('Blog app api');
});

// Admin User Routes
app.use('/api/admin', adminRouter);
// User Routes
app.use('/api/users', userRouter);

module.exports = app;
