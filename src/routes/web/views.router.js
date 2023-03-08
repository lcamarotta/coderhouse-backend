import express from 'express';
import __path from '../../utils/__path.js';
import ProductManager from '../../manager/productManager.js';
import __error from '../../utils/__error.js';
const router = express.Router();
const productManager = new ProductManager(__path('/files/products.json'));

router.get('/', async(req, res) => {
    try {
        await productManager.getProducts()
        if(productManager.products.length === 0) { throw new __error(400, 'Products file is empty') }
        res.render('home', {
            products: productManager.products
        });
    } catch (e) {
        res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
    }
});

router.get('/realtimeproducts', async(req, res) => {

    try {
        await productManager.getProducts()
        if(productManager.products.length === 0) { throw new __error(400, 'Products file is empty') }
        res.render('realTimeProducts', {
            products: productManager.products
        });
    } catch (e) {
        res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
    }
});

export default router;