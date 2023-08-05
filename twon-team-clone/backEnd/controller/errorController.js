const AppError = require('../utilts/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.value}`;
  // 400 bad requst
  return new AppError(message, 400);
};
const handelduplecateDB = err => {
  const message = `duplecate field value : ${
    err.keyValue.name
  } pls use another one`;
  return new AppError(message, 400);
};
const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  //console.log(errors);
  const message = `invalid input data : ${errors.join(', ')}`;
  return new AppError(message, 400);
};
const handelJsonWebTokenError = () => {
  return new AppError('invalid token pls login agin', 400);
};
const handelTokenExpiredError = () => {
  return new AppError('token expired pls login agin', 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
const sendErrorPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('Error', err);
    res.status(500).json({
      status: 'error',
      message: 'something want very wong'
    });
  }
};

// error handler middleware
module.exports = (err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  //console.log('ff ee', err.properties);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    //console.log('error', error);
    /*
  ther are three type of error might created by mongoose 
  which need to mark as operational error

*/
    if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handelduplecateDB(error);
    if (error._message === 'Validation failed')
      error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handelJsonWebTokenError();
    if (error.name === 'TokenExpiredError') error = handelTokenExpiredError();
    sendErrorPro(error, res);
  }
};