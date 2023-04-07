import { Router } from 'express';
import { errorHandler } from '../../utils.js';
import Product from '../../dao/dbManagers/products.js';

const router = Router();
const productManager = new Product;

router.get('/', async(req, res) => {
	const { page = 1, limit = 10, sort, query} = req.query;

	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await productManager.get(query, options);
		res
			.send({ 
				status: 'success',
				...result
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

router.get('/:pid', async(req, res) => {
	const pid = req.params.pid;
	try {
		const result = await productManager.getById(pid);
		res
			.send({
				status: 'success',
				payload: result
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

router.post('/', async(req, res) => {
	const product = req.body;

	const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw new errorHandler(400, 'Incomplete Values');
	}

	try {
		const result = await productManager.save(product)
		res
			.send({
				status: 'success',
				payload: result
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

router.put('/:pid', async(req, res) => {
	const pid = req.params.pid;
	const product = req.body;

	const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw new errorHandler(400, 'Incomplete Values')
	}
	
	try {
		const result = await productManager.update(pid, product)
		res
			.send({
				status: 'success',
				payload: result
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

router.delete('/:pid', async(req, res) =>{
	const id = req.params.pid;
	try {
		const result = await productManager.delete(id);
		res
			.send({
				status: 'success',
				payload: result
			});
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