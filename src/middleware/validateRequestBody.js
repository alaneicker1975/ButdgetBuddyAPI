import { createError } from '../helpers/error';

export const validateRequestBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(createError(400, error.message.replace(/"/g, '')));
  } else {
    return next();
  }
};
