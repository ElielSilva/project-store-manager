const salesService = require('../services/salesService'); 

async function createSales(req, res) {
  const { code, message, data } = await salesService.createSales(req.body);
  res.status(code).json(data || message);
}

module.exports = { createSales };