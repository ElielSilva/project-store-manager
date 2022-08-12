const app = require('./app');

require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
const products = require('./controllers/productsController');

app.get('/products', products.getAll);

app.get('/products/:id', products.findById);

app.post('/products', products.createProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
