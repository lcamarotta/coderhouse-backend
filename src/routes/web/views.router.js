import { Router } from "express";
import { errorHandler } from '../../utils.js';
import Product from '../../dao/dbManagers/products.js';

const router = Router();
const product = new Product;

router.get('/', async(req, res) => {
	const { page = 1 } = req.query;
	const { limit = 10 } = req.query;
	const { sort } = req.query;
	// const { q } = req.query;

	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } }
			)
	}
	try {
		const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await product.get(options);
		res
			.render('home', {
				products: docs,
				hasPrevPage,
				hasNextPage,
				prevPage,
				nextPage,
				limit
			})
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

router.get('/realtimeproducts', async(req, res) => {
	const { page = 1 } = req.query;
	const { limit = 10 } = req.query;
	const { sort } = req.query;

	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } }
			)
	}
	try {
		const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await product.get(options);
		res
			.render('realTimeProducts', {
				products: docs,
				hasPrevPage,
				hasNextPage,
				prevPage,
				nextPage,
				limit
			})
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