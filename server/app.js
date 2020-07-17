const express = require('express');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

if (config.get('NODE_ENV') === 'development' || process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: 'localhost:3000/*',
  })
);

const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');
const globalErrorHandler = require('./controllers/error.controller');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use(globalErrorHandler);

module.exports = app;
