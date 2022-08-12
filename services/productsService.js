const products = require('../models/productsModel');

const validateInfo = require('../helpers/validateInfo');

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

async function createProduct(params) {
  const nameIsValid = validateInfo.validateName(params, validateInfo.schemaProductsName);
  if (nameIsValid) return { code: 404, message: nameIsValid };
  
  const result = await products.createProduct(params);
  if (!result.id) return { code: 500, message: 'erro interno' };
  return { code: 201, data: result };
}
  
module.exports = {
  getAll,
  findById,
  createProduct,
};