// const { log } = require('console');
const Joi = require('joi');

const schemaSales = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

function validateName(listSales, schema) { 
  const { error } = schema.validate(listSales);
  if (!error) return false;
  const erro = error.details[0].message; 
  if (
    erro === '"productId" is required'
    || erro === '"quantity" is required'
  ) {
    return { code: 400, message: erro };
  }
  if (
    erro === '"quantity" must be greater than or equal to 1'
    ) {
    return { code: 422, message: erro };
  }
  return { code: 422, message: error.details[0].message };
}

// log(validateName({ names: 'asdasdad' }, schemaProductsName));

module.exports = { validateName, schemaProductsName };