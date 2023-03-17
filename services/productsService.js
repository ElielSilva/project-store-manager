const productsModel = require('../models/productsModel');

const validateInfo = require('../helpers/validateInfo');

const getAll = async () => {
  const result = await productsModel.getAll();
  // if (!result) return { code: 500, message: 'error internal server' };
  return { code: 200, data: result };
};

const findById = async (id) => {
  const [result] = await productsModel.findById(id);
  if (!result) return { code: 404, message: 'Product not found' };
  return { code: 200, data: result };
};

const findBySearch = async (q) => {
  // console.log(q);
  if (!q) {
    const result = await productsModel.getAll();
    return { code: 200, data: result };
  }
  
  console.log('entrou');
  const result = await productsModel.findBySearch(q);
  return { code: 200, data: result };
};

async function createProduct(params) {
  const nameIsValid = validateInfo.validateName(params, validateInfo.schemaProductsName);
  if (nameIsValid.code) return { code: nameIsValid.code, message: nameIsValid.message };
  const result = await productsModel.createProduct(params);
  // if (!result.id) return { code: 500, message: 'erro interno' };
  return { code: 201, data: result };
}

const updateById = async (id, body) => {
  const nameIsValid = validateInfo.validateName(body, validateInfo.schemaProductsName);
  if (nameIsValid.code) return { code: nameIsValid.code, message: nameIsValid.message };
  const produtExists = await findById(id);
  if (produtExists.code === 404) return produtExists;
  const result = await productsModel.updateById(id, body);
  return { code: 200, data: { ...result } };
};

const deleteById = async (id) => {
  const produtExists = await findById(id);
  if (produtExists.code === 404) return produtExists;
  await productsModel.deleteById(id);
  return { code: 204 };
};
  
module.exports = {
  getAll,
  findById,
  createProduct,
  updateById,
  deleteById,
  findBySearch,
};