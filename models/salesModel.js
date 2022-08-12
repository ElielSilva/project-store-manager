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
  return sales.map(serialize);
}

// async function createSales({ product_id: { productId }, quantity }) {
//   const [insertId] = await connection.execute(
//     'INSERT INTO StoreManager.sales_products (product_id , quantity) VALUES (?,?);',
//     [productId, quantity],
//   );
//   return insertId;
// }

module.exports = {
  getAllSales,
  findByIdSales,
  // createSales,
};
