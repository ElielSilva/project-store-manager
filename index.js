const rescue = require('express-rescue');
const app = require('./app');

require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.get('/products', rescue(productsController.getAll));

app.get('/products/search', rescue(productsController.findBySearch));

app.get('/products/:id', rescue(productsController.findById));

app.post('/products', rescue(productsController.createProduct));

app.put('/products/:id', rescue(productsController.updateById));

app.delete('/products/:id', productsController.deleteById);

app.post('/sales', rescue(salesController.createSales));

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.findByIdSales);

app.delete('/sales/:id', salesController.deleteSales);

app.put('/sales/:id', rescue(salesController.updateSales));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
