export const setErrorResponse = (message, code) => ({
  error: {
    code,
    message,
  },
});
