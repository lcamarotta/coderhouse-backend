import { Router } from "express";
import { rootDir } from '../../utils.js';
import CartManager from "../../dao/fileManagers/cartManager.js";
import Cart from "../../dao/dbManagers/carts.js";
import Product from '../../dao/dbManagers/products.js';

const router = Router();
const useDB = true;
const cartFileManager = new CartManager(rootDir('/files/carts.json'));
const cartDB = new Cart;
const productDB = new Product;

router.post('/', async(req, res) => {
	try {
		if (useDB) {
			const result = await cartDB.create();
			res.send({status: 'Success', msg:`Empty cart with ID ${result._id} created`});
		} else {
			const result = await cartFileManager.addCart()
			res.send({status: 'Success', msg:`Empty cart with ID ${result} created`});
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.post('/:cid/product/:pid', async(req, res) => {
	try {
		if (useDB) {
			const cid = req.params.cid;
			const pid = req.params.pid;
			const result = await cartDB.update(cid, pid)
			res.send({status: 'Success', payload: result});
		} else {
			const cid = Number(req.params.cid);
			const pid = Number(req.params.pid);
			await cartFileManager.addProductToCart(cid, pid)
			res.send({status: 'Success'});
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.get('/:cid', async(req,res) => {
	try {
		if (useDB) {
			const cid = req.params.cid
			const cart = await cartDB.getById(cid)
			res.send(cart)
		} else {
			const cid = Number(req.params.cid);
			const cart = await cartFileManager.getCartById(cid)
			res.send(cart.products)
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

export default router;