import { Validator } from 'jsonschema';
import { setErrorResponse } from '../helpers/response';

const validator = new Validator();

export const validateRequestBody = (schema) => (req, res, next) => {
  const { errors } = validator.validate(req.body, schema);

  if (errors.length === 0) {
    return next();
  } else {
    const error = new Error(errors.map((error) => error.stack).join(', '));
    error.status = 400;
    return next(error);
  }
};
