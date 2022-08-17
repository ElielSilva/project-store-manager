const salesService = require('../services/salesService'); 

async function getAllSales(req, res) {
  const { code, message, data } = await salesService.getAllSales();
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
}

async function findByIdSales(req, res) {
  const { code, message, data } = await salesService.findByIdSales(req.params.id);
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
}

async function createSales(req, res) {
  // console.log(req.body);
  // console.log('---------------  entrou  ----------------------');
  const { code, message, data } = await salesService.createSales(req.body);
  if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

module.exports = {
  getAllSales,
  findByIdSales,
  createSales,
};