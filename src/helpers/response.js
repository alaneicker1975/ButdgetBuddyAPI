export const setErrorResponse = (error, code) => ({
  error: {
    code,
    message: error.message,
  },
});
