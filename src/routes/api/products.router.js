import { Router } from 'express';
import __path from '../../utils/__path.js';
import ProductManager from '../../manager/productManager.js';

const router = Router();
const productsManager = new ProductManager(__path('/files/products.json'));

router.get('/', async(req, res) => {
	const limit = Number(req.query.limit);
	try {
		await productsManager.getProducts();
		const products = productsManager.products
		if(!limit){
			res.send({products});
		} else{
			while(products.length > limit){
				products.pop();
			}
			res.send({products});
		}
	} catch (e) {
		console.error(e);
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.get('/:pid', async(req, res) => {
	const productId = Number(req.params.pid);
	try {
		const product = await productsManager.getProductsById(productId);
		res.send({product});
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.post('/', async(req, res) => {
	const product = req.body;
	try {
		await productsManager.addProduct(product);
		res.status(200).send({status: 'success'});
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.put('/:pid', async(req, res) => {
	const id = Number(req.params.pid)
	const updateData = req.body;
	try {
		await productsManager.updateProduct(id, updateData);
		res.send({status: 'success'});
	} catch (e) {
		console.log(e)
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}

});

router.delete('/:pid', async(req, res) =>{
	const id = Number(req.params.pid)
	try {
		await productsManager.deleteProduct(id);
		res.send({status: 'success'});
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
}
});

export default router;