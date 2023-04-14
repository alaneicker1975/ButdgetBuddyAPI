import { Validator } from 'jsonschema';

const validator = new Validator();

export const validate = (data, schema) => {
  const { errors } = validator.validate(data, schema);

  return {
    errors: errors.length > 0 ? errors.map((error) => error.stack) : null,
  };
};
