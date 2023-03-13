import { Router } from "express";
import { rootDir } from '../../utils.js';
import CartManager from "../../dao/fileManagers/cartManager.js";

const router = Router();
const useDB = true;
const cartManager = new CartManager(rootDir('/files/carts.json'));

router.post('/', async(req, res) => {
	try {
		if (useDB) {
			
		} else {
			const result = await cartManager.addCart()
			res.send({status: 'Success', msg:`Empty cart with ID ${result} created`});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.post('/:cid/product/:pid', async(req, res) => {
	const cid = Number(req.params.cid);
	const pid = Number(req.params.pid);
	try {
		if (useDB) {
			
		} else {
			await cartManager.addProductToCart(cid, pid)
			res.send({status: 'Success'});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.get('/:cid', async(req,res) => {
	const cid = Number(req.params.cid);
	try {
		if (useDB) {
			
		} else {
			const cart = await cartManager.getCartById(cid)
			res.send(cart.products)
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

export default router;