export const setErrorResponse = (error, code) => {
  return {
    error: {
      code,
      message: error.message,
    },
  };
};
