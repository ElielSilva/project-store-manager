const { log } = require('console');
const Joi = require('joi');

const schemaProductsName = Joi.object({
  name: Joi.string().required(),
});

function validateName(name, schema) { 
  const { error } = schema.validate(name);
  if (!error) return false;
  return error.details[0].message;
}

// log(validateName({ name: 'ef' }, schemaProductsName));

module.exports = { validateName, schemaProductsName };