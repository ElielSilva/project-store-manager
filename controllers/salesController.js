const salesService = require('../services/salesService'); 

async function createSales(req, res) { 

  
  const result = await salesService.createSales(req.body)

}

module.exports = { createSales };