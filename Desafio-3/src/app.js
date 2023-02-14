import express from 'express';
import ProductManager from './productManager.js';
import path from  'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const productsManager = new ProductManager(path.join(dirname, '..', '/data/data.json'));

app.use(express.urlencoded({extended:true}))
app.get('/products', async(req, res) => {
  let limit = req.query;
  limit = Number(limit.limit)
  const products = await productsManager.getProducts();
  if(!limit){
    res.send({products});
  } else{
    while(products.length > limit){
      products.pop();
    }
    res.send({products})
  }
});

app.get('/products/:pid', async(req, res) => {
  const productId = Number(req.params.pid);
  const product = await productsManager.getProductsById(productId);
  res.send({product})
});

app.listen(8080, () => console.log('Listening on port 8080'));