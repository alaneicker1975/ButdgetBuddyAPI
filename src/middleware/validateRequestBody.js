import { Validator } from 'jsonschema';
import { setErrorResponse } from '../helpers/response';

const validator = new Validator();

export const validateRequestBody = (schema) => (req, res, next) => {
  const { errors } = validator.validate(req.body, schema);

  if (errors.length === 0) {
    next();
  } else {
    const error = { message: errors.map((error) => error.stack).join(', ') };
    res.status(400).send(setErrorResponse(error, 400));
  }
};
