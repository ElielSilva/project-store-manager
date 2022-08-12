const salesModel = require('../models/salesModel');


async function createSales(params) {
  

  const result = await salesModel.create(params);
}

module.exports = { createSales };