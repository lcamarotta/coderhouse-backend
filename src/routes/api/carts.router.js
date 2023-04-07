import { Router } from "express";
import Cart from "../../dao/dbManagers/carts.js";
import { errorHandler } from "../../utils.js";

const router = Router();
const cartManager = new Cart;

router.get('/:cid', async(req,res) => {
	const { cid } = req.params
	try {
		const result = await cartManager.getById(cid)
		res
			.send({
				status: 'Success',
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

router.post('/', async(req, res) => {
	try {
		const result = await cartManager.create();
		res
			.send({
				status: 'Success',
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

router.post('/:cid/product/:pid', async(req, res) => {
	const { cid, pid } = req.params;
	try {
		const result = await cartManager.update(cid, pid);
		res
			.send({
				status: 'Success',
				payload: result
			});
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	}
});

router.put('/:cid', async(req,res) => {
	const { cid } = req.params;
	const arrayOfProductsToUpdate = req.body;
	const result = []
	try {
		for (const object of arrayOfProductsToUpdate) {
			result.push(await cartManager.update(cid, object.productId, object.quantity));
		  }
		res
			.send({
				status: 'Success',
				payload: result
			});
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	}
});

router.put('/:cid/products/:pid', async(req, res) => {
	const { cid, pid } = req.params;
	const quantity = req.body;
	try {
		if(await cartManager.isProductInCart(cid, pid) == -1) throw new errorHandler(400, 'Can not update product quantity because it has not been added to cart');
		const result = await cartManager.update(cid, pid, quantity.quantity);
		res
			.send({
				status: 'Success',
				payload: result
			});
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	}
});

router.delete('/:cid/products/:pid', async(req, res) => {
	const { cid, pid } = req.params;
	try {
		const result = await cartManager.deleteById(cid, pid);
		res
			.send({
				status: 'Success',
				payload: result
			});
	} catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	}
});

router.delete('/:cid', async(req,res) => {
	const { cid } = req.params;
	try {
		const result = await cartManager.deleteAll(cid);
		res
			.send({
				status: 'Success',
				payload: result
			});
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