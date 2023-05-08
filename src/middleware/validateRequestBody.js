import { Validator } from 'jsonschema';
import { createError } from '../helpers/error';

const validator = new Validator();

export const validateRequestBody = (schema) => (req, res, next) => {
  const { errors } = validator.validate(req.body, schema);

  if (errors.length === 0) {
    return next();
  } else {
    return next(
      createError(400, errors.map((error) => error.stack).join(', ')),
    );
  }
};
