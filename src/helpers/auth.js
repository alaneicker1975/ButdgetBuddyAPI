export const getToken = (headers) => {
  if (headers.authorization) {
    return headers.authorization.split(' ')[1];
  }

  return null;
};
