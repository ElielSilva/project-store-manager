const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT id, name FROM StoreManager.products;',
  );
  return products;
};

const findById = async (id) => {
  const [products] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return products;
};

const createProduct = async (params) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [params.name],
  );
  return { id: insertId, name: params.name };
};

const updateById = async (id, body) => {
  // const [products] =
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [body.name, id],
  );
  // console.log(products);
  // return products;
  return { id, name: body.name };
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateById,
  deleteById,
};
