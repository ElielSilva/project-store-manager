const salesModel = require('../models/salesModel');
const validateSales = require('../helpers/validateBodySales');

const productsService = require('./productsService');

function funcSalesIsvalid(sales) {
  if (!sales) return false;
  const salesIsvalid = sales.reduce((acc, curr) => {
    const x = validateSales.validatePropety(curr, validateSales.schemaSales);
    if (x !== false) acc.push(x);
    return acc;
  }, []);
  return salesIsvalid;
}

async function funcProductsNotfound(sales) {
  const { data } = await productsService.getAll();
  const newAllProducts = data.map((item) => item.id); // 1 2 3
  const b = sales
    .map((item) => newAllProducts.includes(item.productId))
    .every((i) => i === true);
  return b;
}

async function getAllSales() {
  const sales = await salesModel.getAllSales();
  if (!sales.length) return { code: 500, message: 'error interno' };
  return { code: 200, data: sales };
}

async function findByIdSales(id) {
  const sales = await salesModel.findByIdSales(id);
  if (!sales.length) return { code: 404, message: 'Sale not found' };
  return { code: 200, data: sales };
}

async function createSales(sales) {
  const salesIsvalid = funcSalesIsvalid(sales);
  if (salesIsvalid[0]) return salesIsvalid[0];

  const productsNotfound = await funcProductsNotfound(sales);
  if (!productsNotfound) return { code: 404, message: 'Product not found' };
  
  const insertId = await salesModel.createSales();

  Promise.all(
    sales.map(async (sale) => salesModel.createSalesProducts(insertId, sale)),
  ); 
  return { code: 201, data: { id: insertId, itemsSold: sales } };
}

async function deleteSales(id) {
  const sales = await salesModel.deleteSales(id);
  if (sales) return { code: 404, message: 'Sale not found' };
  return { code: 204 };
}

async function updateSales(Id, sales) {
  const salesIsvalid = funcSalesIsvalid(sales);
  if (salesIsvalid[0]) return salesIsvalid[0];

  const productsNotfound = await funcProductsNotfound(sales);
  if (!productsNotfound) return { code: 404, message: 'Product not found' };
  
  const salesExists = await salesModel.findByIdSales(Id);
  if (!salesExists.length) return { code: 404, message: 'Sale not found' };

  Promise.all(
    sales.map(async (sale) => salesModel.updateSalesProducts(Id, sale)),
  ); 
  return { code: 200, data: { saleId: Id, itemsUpdated: sales } };
}

module.exports = {
  getAllSales,
  findByIdSales,
  createSales,
  deleteSales,
  updateSales,
};
