import { Validator } from 'jsonschema';

const validator = new Validator();

export const validateRequestBody = (data, schema) => (req, res, next) => {
  const { errors } = validator.validate(data, schema);

  if (errors.length > 0) {
    next();
  } else {
    res.status(400).send(errors.map((error) => error.stack));
  }
};
