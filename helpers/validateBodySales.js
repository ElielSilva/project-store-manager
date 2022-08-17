const Joi = require('joi');

const schemaSales = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

function validatePropety(listSales, schema) {
  const { error } = schema.validate(listSales);
  if (!error) return false;
  const erro = error.details[0].message || false;
  if (
    erro === '"productId" is required'
    || erro === '"quantity" is required'
  ) {
    return { code: 400, message: erro };
  }
  return { code: 422, message: erro };
}

// const a = [{ /* productId: 1, */ quantity: 1 }, { productId: 2, quantity: 0 }];
// a.forEach((element) => {
//   console.log(validatePropety(element, schemaSales));
// });

module.exports = { validatePropety, schemaSales };