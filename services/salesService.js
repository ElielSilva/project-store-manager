// const salesModel = require('../models/salesModel');
const validateSales = require('../helpers/validateBodySales');

async function createSales(sales) {
  sales.forEach((sale) => {
    const salesIsvalid = validateSales.validatePropety(sale, validateSales.schemaSales);
    if (salesIsvalid) return salesIsvalid;
  });

  // const result = await salesModel.create(params);
}

module.exports = { createSales };