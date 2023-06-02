export const createError = (statusCode = 500, message) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  return error;
};
