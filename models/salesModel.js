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
  const result = sales.map(serialize);
  return result;
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
  const result = sales.map(serialize);
  return result;
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

async function deleteSales(id) {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  // console.log('exist', result.length > 0, result);
  if (result.length === 0) {
    return true;
  }

  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
 
  return false;
}

async function updateSalesProducts(id, sale) {
  const { productId, quantity } = sale;
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id =?  and sale_id = ?;',
    [quantity, productId, id],
  );
}

module.exports = {
  getAllSales,
  findByIdSales,
  createSales,
  createSalesProducts,
  deleteSales,
  updateSalesProducts,
};
