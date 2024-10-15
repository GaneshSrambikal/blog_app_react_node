const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

// Middleware setup
// app.use(cors());
app.use(morgan('dev'));
app.use(require('express').json());

// Routes
app.get('/', (req, res) => {
  res.send('Blog app api');
});
app.use('/api/users', userRouter);

module.exports = app;
