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

module.exports = {
  getAll, findById,
};
