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
  const { code, message, data } = await salesService.createSales(req.body);
  if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

async function deleteSales(req, res) {
  const { code, message } = await salesService.deleteSales(req.params.id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json();
}

async function updateSales(req, res) {
  const { code, message, data } = await salesService.updateSales(req.params.id, req.body);
  if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

module.exports = {
  getAllSales,
  findByIdSales,
  createSales,
  deleteSales,
  updateSales,
};