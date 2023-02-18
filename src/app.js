import express from 'express';
import APIcartsRouter from './routes/api_carts.router.js';
import APIproductsRouter from './routes/api_products.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/carts', APIcartsRouter);
app.use('/api/products', APIproductsRouter);

app.listen(8080, () => console.log('Server listening on port 8080'))