import { Router } from "express";
import Product from '../../dao/dbManagers/products.js';
import Cart from "../../dao/dbManagers/carts.js";

const router = Router();
const productManager = new Product;
const cartManager = new Cart;

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

router.get('/', async(req, res) => {
	res.redirect('/products');
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

router.get('/carts/:cid', privateAccess, async(req, res) => {
	const { cid } = req.params;

	try {
		const result = await cartManager.getById(cid);
		const productsArray = []
		result.products.forEach(element => {
			const product = {
				quantity: element.quantity,
				...element.product._doc
			}
			productsArray.push(product)
		});
		res
			.render('cart', {productsArray})
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error} `
			});
	}
});

router.get('/products', privateAccess, async(req, res) => {
	const { page = 1, limit = 10, sort, query} = req.query;
	const user = req.session.user
	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await productManager.get(query, options);
		const payload = {
			user,
			...result
		}
		res
			.render('products', payload)
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error} `
			});
	}
});

router.get('/register', publicAccess, (req, res) => {
	res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
	res.render('login');
});

router.post('/carts/:cid/product/:pid', async(req, res) => {
	const { cid, pid } = req.params;
	try {
		const result = await cartManager.update(cid, pid);
		res.redirect('/products');
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	}
});

export default router;