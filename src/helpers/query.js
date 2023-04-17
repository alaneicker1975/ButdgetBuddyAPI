export const setColumnPlaceholders = (body) => {
  const placeholders = Object.keys(body).map(
    (cols, index) => `${cols} = $${index + 1}`,
  );
  return placeholders.join(', ');
};
