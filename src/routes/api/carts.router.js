import { Router } from "express";
import Cart from "../../dao/dbManagers/carts.js";

const router = Router();
const cart = new Cart;

router.get('/:cid', async(req,res) => {
	const cid = req.params.cid
	try {
		const result = await cart.getById(cid)
		res
			.send({
				status: 'Success',
				payload: result
			});
	} catch (error) {
		res
			.status(error.httpStatusCode)
			.send({
				status: `Error ${error.httpStatusCode}`,
				payload: `${error.msg}`
			});
	}
});

router.post('/', async(req, res) => {
	try {
		const result = await cart.create();
		res
			.send({
				status: 'Success',
				payload: result
			});
	} catch (error) {
		res
			.status(error.httpStatusCode)
			.send({
				status: `Error ${error.httpStatusCode}`,
				payload: `${error.msg}`
			});
	}
});

router.post('/:cid/product/:pid', async(req, res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;
	try {
		const result = await cart.update(cid, pid);
		res
			.send({
				status: 'Success',
				payload: result
			});
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