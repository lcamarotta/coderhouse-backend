import express from 'express';
import { errorHandler, rootDir } from '../../utils.js';
import ProductManager from '../../dao/fileManagers/productManager.js';
import Product from '../../dao/dbManagers/products.js';
import Message from '../../dao/dbManagers/messages.js';

const router = express.Router();
const useDB = true;
const productManager = new ProductManager(rootDir('/files/products.json'));
const productDB = new Product;

router.get('/', async(req, res) => {
	try {
		if (useDB) {
			const result = await productDB.get()
			if(result.length === 0) { throw new errorHandler(400, 'Products file is empty') }
			res.render('home', {
				products: result
			})
		} else {
			await productManager.getProducts()
			if(productManager.products.length === 0) { throw new errorHandler(400, 'Products file is empty') }
			res.render('home', {
				products: productManager.products
			});
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.get('/realtimeproducts', async(req, res) => {

	try {
		if (useDB) {
			const result = await productDB.get()
			if(result.length === 0) { throw new errorHandler(400, 'Products file is empty') }
			res.render('realtimeProducts', {
				products: result
			})
		} else {
			await productManager.getProducts()
			if(productManager.products.length === 0) { throw new errorHandler(400, 'Products file is empty') }
			res.render('realTimeProducts', {
				products: productManager.products
			});
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.get('/chat', async(req, res) => {
	try {
		res.render('chat')
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

export default router;