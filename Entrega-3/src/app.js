import express from 'express';
import ProductManager from "./productManager.js";
const myProductsManager = new ProductManager();

const app = express();

app.get('/', (req, res) => {
  res.send('Server')
});

app.listen(8080, () => console.log('Listening on port 8080'));