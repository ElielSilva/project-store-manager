const salesModel = require('../models/salesModel');
// const validateSales = require('../helpers/validateBodySales');

async function getAllSales() {
  const sales = await salesModel.getAllSales();
  if (!sales.length) return { code: 500, message: 'error interno' };
  return { code: 200, data: sales };
}

async function findByIdSales(id) {
  const sales = await salesModel.findByIdSales(id);
  if (!sales.length) return { code: 404, message: 'Sale not found' };
  return { code: 200, data: sales };
}

// async function createSales(sales) {
//   sales.forEach((sale) => {
//     const salesIsvalid = validateSales.validatePropety(sale, validateSales.schemaSales);
//     if (salesIsvalid) return salesIsvalid;
//   });

  // const result = await salesModel.create(params);
// }

module.exports = {
  getAllSales,
  findByIdSales,
  // createSales,
};