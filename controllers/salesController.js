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

// async function createSales(req, res) {
//   const { code, message, data } = await salesService.createSales(req.body);
//   res.status(code).json(data || message);
// }

module.exports = {
  getAllSales,
  findByIdSales,
  // createSales,
};