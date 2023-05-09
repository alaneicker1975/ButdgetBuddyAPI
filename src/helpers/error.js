export const createError = (statusCode = 500, message) => {
  const error = new Error(message);
  error.status = statusCode;
  return error;
};
