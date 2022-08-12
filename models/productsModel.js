const connection = require('./connection');

// Busca todas as pessoas autoras do banco.

const getAll = async () => {
  const [authors] = await connection.execute(
    'SELECT id, name FROM StoreManager.products;',
  );
  return authors;
};

const findById = async (id) => {
  const [authors] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return authors;
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
