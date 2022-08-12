// // const { log } = require('console');
// const Joi = require('joi');
// const productModel = require('../models/productsModel');

// async function consultById(id) {
//   const response = await productModel.findById(id);
  
//   // console.log('response');
//   // console.log(response);
//   return response;
// }

// const schemaSales = Joi.object({
//   productId: Joi.number().required(),
//   quantity: Joi.number().min(1).required(),
// });

// async function validateProduct(id) {
//   // console.log("response");
//   const response = await consultById(id); 

//   if (response === []) return { code: 404, message: 'Product not found' };
//   return false;
// }

// function name(params) {
//   if (erro === '"quantity" must be greater than or equal to 1') {
//     return { code: 422, message: erro };
//   }
// }

// async function validatePropety(listSales, schema) {
//   const { error } = schema.validate(listSales);
//   if (!error) return validateProduct(listSales.productId);
//   const erro = error.details[0].message || false;
//   if (
//     erro === '"productId" is required'
//     || erro === '"quantity" is required'
//   ) {
//     return { code: 400, message: erro };
//   }
// }

// // console.log(
// //   validatePropety([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }], schemaSales),
// // );
// const a = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
// a.forEach((element) => {
//   console.log(validatePropety(element, schemaSales));
// });

// module.exports = { validatePropety, schemaSales };