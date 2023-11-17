const express = require('express');
const cors = require('cors');
const routes = require('./app/routes');
const globalErrorHandler = require('./app/middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');

const app = express('secret');
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// parser
app.use(express.json());
app.use(cookieParser('secret'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('You can create ToDo here!');
});

// Application routes
app.use('/api/v1', routes);

// global error handler
app.use(globalErrorHandler);

// Handle not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  });
});

module.exports = app;
