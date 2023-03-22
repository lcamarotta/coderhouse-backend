import { Router } from "express";
import { errorHandler } from '../../utils.js';
import Product from '../../dao/dbManagers/products.js';

const router = Router();
const product = new Product;

router.get('/', async(req, res) => {
	const { page = 1, limit = 10, sort, query} = req.query;

	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await product.get(query, options);
		res
			.render('home', result)
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error} `
			});
	}
});

router.get('/chat', async(req, res) => {
	try {
		res
			.render('chat')
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error} `
			});
	}
});

router.get('/realTimeProducts', async(req, res) => {
	const { page = 1, limit = 10, sort, query} = req.query;

	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await product.get(query, options);
		res
			.render('realTimeProducts', result)
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error} `
			});
	}
});

export default router;