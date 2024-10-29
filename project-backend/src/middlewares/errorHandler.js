export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({
    status,
    message,
  });
};

// instea of req and next we can write __ whiler we're not using them
