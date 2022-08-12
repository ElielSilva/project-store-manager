const connection = require('./connection');

// Busca todas as pessoas autoras do banco.

async function createSales({ product_id: { productId }, quantity }) {
  const [insertId] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_id , quantity) VALUES (?,?);',
    [productId, quantity],
  );
  return insertId;
}

module.exports = {
  createSales,
};
