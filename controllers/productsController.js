const products = require('../services/productsService');

async function getAll(req, res) {
  const { code, message, data } = await products.getAll();
  if (!data) return res.status(code).json(message);
  // console.log(data);
  res.status(code).json(data);
}

async function findById(req, res) {
  const { id } = req.params;
  const { code, message, data } = await products.findById(id);
  if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

async function createProduct(req, res) {
  const { code, message, data } = await products.createProduct(req.body);
  if (!data) return res.status(code).json({ message });
  res.status(code).json({ ...data });
}

module.exports = { getAll, findById, createProduct };