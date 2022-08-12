const products = require('../models/productsModel');

const getAll = async () => {
  const result = await products.getAll();
  // console.log(result);
  if (!result) return { code: 500, message: 'error internal server' };
  return { code: 200, data: result };
};

const findById = async (id) => {
  const [result] = await products.findById(id);
  // console.log(result);

  if (!result) return { code: 404, message: 'Product not found' };
  return { code: 200, data: result };
};

module.exports = {
  getAll,
  findById,
};