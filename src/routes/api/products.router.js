import { Router } from 'express';
import { rootDir } from '../../utils.js';
import ProductManager from '../../dao/fileManagers/productManager.js';

const router = Router();
const useDB = true;
const productsManager = new ProductManager(rootDir('/files/products.json'));

router.get('/', async(req, res) => {
	const limit = Number(req.query.limit);
	try {
		if (useDB) {
			
		} else {
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
		}
	} catch (e) {
		console.error(e);
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.get('/:pid', async(req, res) => {
	const productId = Number(req.params.pid);
	try {
		if (useDB) {
			
		} else {
			const product = await productsManager.getProductsById(productId);
			res.send({product});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.post('/', async(req, res) => {
	const product = req.body;
	try {
		if (useDB) {
			
		} else {
			await productsManager.addProduct(product);
			res.status(200).send({status: 'success'});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}
});

router.put('/:pid', async(req, res) => {
	const id = Number(req.params.pid)
	const updateData = req.body;
	try {
		if (useDB) {
			
		} else {
			await productsManager.updateProduct(id, updateData);
			res.send({status: 'success'});
		}
	} catch (e) {
		console.log(e)
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
	}

});

router.delete('/:pid', async(req, res) =>{
	const id = Number(req.params.pid)
	try {
		if (useDB) {
			
		} else {
			await productsManager.deleteProduct(id);
			res.send({status: 'success'});
		}
	} catch (e) {
		res.status(e.httpStatusCode).send({status: `Error ${e.httpStatusCode}`, error: `${e.msg}`});
}
});

export default router;