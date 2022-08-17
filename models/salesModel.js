const connection = require('./connection');

const serialize = (authorData) => ({
  saleId: authorData.sale_id,
  date: authorData.date,
  productId: authorData.product_id,
  quantity: authorData.quantity,
});

async function getAllSales() {
  const [sales] = await connection.execute(
    `SELECT SP.sale_id,S.date,SP.product_id,SP.quantity 
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id;`,
  ); 
  return sales.map(serialize);
}

async function findByIdSales(id) {
  const [sales] = await connection.execute(
    `SELECT S.date,SP.product_id,SP.quantity 
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
    WHERE id = ?;`,
    [id],
  );
  // console.log(sales);

  return sales.map(serialize);
}

async function createSales() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ();',
  );
  return insertId;
}

async function createSalesProducts(id, sale) {
  const { productId, quantity } = sale;
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
    [id, productId, quantity],
  );
}

module.exports = {
  getAllSales,
  findByIdSales,
  createSales,
  createSalesProducts,
};
