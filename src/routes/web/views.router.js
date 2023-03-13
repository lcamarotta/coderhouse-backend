import express from 'express';
import { errorHandler, rootDir } from '../../utils.js';
import ProductManager from '../../dao/fileManagers/productManager.js';

const router = express.Router();
const useDB = true;
const productManager = new ProductManager(rootDir('/files/products.json'));

router.get('/', async(req, res) => {
	try {
		if (useDB) {

		} else {
			await productManager.getProducts()
			if(productManager.products.length === 0) { throw new errorHandler(400, 'Products file is empty') }
			res.render('home', {
				products: productManager.products
			});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.get('/realtimeproducts', async(req, res) => {

	try {
		if (useDB) {
			
		} else {
			await productManager.getProducts()
			if(productManager.products.length === 0) { throw new errorHandler(400, 'Products file is empty') }
			res.render('realTimeProducts', {
				products: productManager.products
			});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

export default router;