export const setUpdatePlaceholders = (body = {}) =>
  Object.keys(body)
    .map((cols, index) => `${cols} = $${index + 1}`)
    .join(', ');

export const setInsertPlaceholders = (body = {}) =>
  Object.keys(body)
    .map((_, index) => `$${index + 1}`)
    .join(', ');

export const getValues = (body = {}) => Object.values(body);
