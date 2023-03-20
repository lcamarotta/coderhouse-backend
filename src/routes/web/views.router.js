import { Router } from "express";
import { errorHandler } from '../../utils.js';
import Product from '../../dao/dbManagers/products.js';

const router = Router();
const productDB = new Product;

router.get('/', async(req, res) => {
	try {
		const result = await productDB.get()
		if(result.length === 0) throw new errorHandler(400, 'Products file is empty');
		res
			.render('home', {
				products: result
			})
	} catch (error) {
		res
			.status(error.httpStatusCode)
			.send({
				status: `Error ${error.httpStatusCode}`,
				payload: `${error.msg}`
			});
	}
});

router.get('/chat', async(req, res) => {
	try {
		res
			.render('chat')
	} catch (error) {
		res
			.status(error.httpStatusCode)
			.send({
				status: `Error ${error.httpStatusCode}`,
				payload: `${error.msg}`
			});
	}
});

router.get('/realtimeproducts', async(req, res) => {

	try {
		const result = await productDB.get()
		if(result.length === 0) throw new errorHandler(400, 'Products file is empty');
		res
			.render('realtimeProducts', {
			products: result
			})
	} catch (error) {
		res
			.status(error.httpStatusCode)
			.send({
				status: `Error ${error.httpStatusCode}`,
				payload: `${error.msg}`
			});
	}
});

export default router;