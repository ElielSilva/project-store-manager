const connection = require('./connection');

// Busca todas as pessoas autoras do banco.

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

module.exports = {
  getAll,
  findById,
  createProduct,
};
