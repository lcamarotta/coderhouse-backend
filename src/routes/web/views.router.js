import { Router } from "express";
import Product from '../../dao/dbManagers/products.js';
import Cart from "../../dao/dbManagers/carts.js";

const router = Router();
const product = new Product;
const cart = new Cart;

router.get('/', async(req, res) => {
		res.render('home')
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

router.get('/carts/:cid', async(req, res) => {
	const { cid } = req.params;

	try {
		const result = await cart.getById(cid);
		res
			.render('cart', result)
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error} `
			});
	}
});

router.get('/products', async(req, res) => {
	const { page = 1, limit = 10, sort, query} = req.query;

	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await product.get(query, options);
		res
			.render('products', result)
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