const salesModel = require('../models/salesModel');
const validateSales = require('../helpers/validateBodySales');

const productsService = require('./productsService');

function funcSalesIsvalid(sales) {
  // console.log(sales)
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
  // console.log(data);
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
  // console.log(sales)
  const salesIsvalid = funcSalesIsvalid(sales);
  if (salesIsvalid[0]) return salesIsvalid[0];

  const productsNotfound = await funcProductsNotfound(sales);
  // const productsNotfound = sales.reduce((acc, curr) => {
  //   if (curr.productId <= x.length) acc.push(true);
  //   return acc;
  // }, []);
  // console.log('meu console ======== ', productsNotfound);
  if (!productsNotfound) return { code: 404, message: 'Product not found' };
  
  const insertId = await salesModel.createSales();

  Promise.all(
    sales.map(async (sale) => salesModel.createSalesProducts(insertId, sale)),
  ); 
  return { code: 201, data: { id: insertId, itemsSold: sales } };
}

module.exports = {
  getAllSales,
  findByIdSales,
  createSales,
};

// for (const sale of sales) {
  //   const salesIsvalid = validateSales.validatePropety(sale, validateSales.schemaSales);
  //   console.log(salesIsvalid);
  //   if (salesIsvalid.code) return salesIsvalid;
  // }
  // sales.forEach((sale) => {
  //   const salesIsvalid = validateSales.validatePropety(sale, validateSales.schemaSales);
  //   console.log(salesIsvalid);
  //   if (salesIsvalid.code) return salesIsvalid;
  // });

  // findByIdSales
  // const result = await salesModel.createSales(sales);
  // return { code: 201, data: result };

  // for (let index = 0; index < sales.length; index += 1) {
  //   const salesIsvalid = validateSales.validatePropety(
  //     sales[index],
  //     validateSales.schemaSales,
  //   );
  //   if (salesIsvalid.code) return salesIsvalid;
  // }

  // async function productsExists(id) {
  //   const result = await productsService.findById(id);
  //   if (result.code === 404) return true;
  // }
  // const productsNotfound = sales.map((sale) => productsExists(sale.productId));
  // if (productsNotfound.includes(true)) return { code: 123, message: 'Product not found' }; 
  //   for (let index = 0; index < sales.length; index += 1) {
  //   const salesExists = productsExists(sales[index].productId);
  //   if (salesExists.code !== 200) return salesExists
  // }
  // const result = await salesModel.createSales(sales);
  // return { code: 201, data: result }