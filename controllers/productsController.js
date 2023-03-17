const productsService = require('../services/productsService');

async function getAll(req, res) {
  const { code, data } = await productsService.getAll();
  res.status(code).json(data);
}

async function findById(req, res) {
  const { id } = req.params;
  const { code, message, data } = await productsService.findById(id);
  if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

async function findBySearch(req, res) {
  const { q } = req.query;
  console.log(req.query.q, q);
  const { code, data } = await productsService.findBySearch(q);
  // if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

async function createProduct(req, res) {
  const { code, message, data } = await productsService.createProduct(req.body);
  if (!data) return res.status(code).json({ message });
  res.status(code).json({ ...data });
}

async function updateById(req, res) {
  const { id } = req.params;
  const { code, message, data } = await productsService.updateById(id, req.body);
  if (!data) return res.status(code).json({ message });
  res.status(code).json(data);
}

async function deleteById(req, res) {
  const { id } = req.params;
  const { code, message, data } = await productsService.deleteById(id);
  if (!data) return res.status(code).json({ message });
  res.status(code).json();
}

module.exports = {
  getAll,
  findById,
  createProduct,
  updateById,
  deleteById,
  findBySearch,
};