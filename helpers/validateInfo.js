// const { log } = require('console');
const Joi = require('joi');

const schemaProductsName = Joi.object({
  name: Joi.string().min(5).required(),
});

function validateName(name, schema) { 
  const { error } = schema.validate(name);
  if (!error) return false;
  if (error.details[0].message === '"name" is required') { 
    return { code: 400, message: error.details[0].message };  
  }
  return { code: 422, message: error.details[0].message };
}

// log(validateName({ names: 'asdasdad' }, schemaProductsName));

module.exports = { validateName, schemaProductsName };