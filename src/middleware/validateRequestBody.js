import { Validator } from 'jsonschema';

const validator = new Validator();

export const validateRequestBody = (schema) => (req, res, next) => {
  const { errors } = validator.validate(req.body, schema);

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).send(errors.map((error) => error.stack));
  }
};
