import { Router } from 'express';
import { rootDir } from '../../utils.js';
import ProductManager from '../../dao/fileManagers/productManager.js';
import Product from '../../dao/dbManagers/products.js';

const router = Router();
const useDB = true;
const productsFileManager = new ProductManager(rootDir('/files/products.json'));
const productDB = new Product;

router.get('/', async(req, res) => { 
	const limit = Number(req.query.limit);
	try {
		if (useDB) {
			const result = await productDB.get(limit)
			res.send({ status: 'success', payload: result })
		} else {
			await productsFileManager.getProducts();
			const products = productsFileManager.products
			if(!limit){
				res.send({products});
			} else{
				while(products.length > limit){
					products.pop();
				}
				res.send({products});
			}
		}
	} catch (error) {
		console.errorrerrorr(error);
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.get('/:pid', async(req, res) => {
	try {
		if (useDB) {
			const pid = req.params.pid;
			const result = await productDB.getById(pid);
			res.send({ status: 'success', payload: result })
		} else {
			const productId = Number(req.params.pid);
			const product = await productsFileManager.getProductsById(productId);
			res.send({ product });
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.post('/', async(req, res) => {
	const product = req.body;
	const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code ){
		res.status(400).send({ status: 'Error', msg: 'Incomplete Values' })
		return
	}
	try {
		if (useDB) {
			const result = await productDB.save(product)
			res.send({ status: 'success', payload: result })
		} else {
			await productsFileManager.addProduct(product);
			res.send({status: 'success'});
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}
});

router.put('/:pid', async(req, res) => {
	try {
		if (useDB) {
			const pid = req.params.pid;
			const product = req.body;
			const { title, category, price, stock, description, thumbnail, code } = product;
			if(!title || !category || !price || !stock || !description || !thumbnail || !code ){
				res.status(400).send({ status: 'Error', msg: 'Incomplete Values' })
				return
			}
			const result = await productDB.update(pid, product)
			res.send({ status: 'success', payload: result })
		} else {
			const id = Number(req.params.pid)
			const updateData = req.body;
			await productsFileManager.updateProduct(id, updateData);
			res.send({status: 'success'});
		}
	} catch (error) {
		console.log(error)
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
	}

});

router.delete('/:pid', async(req, res) =>{
	try {
		if (useDB) {
			const id = req.params.pid;
			const result = await productDB.delete(id);
			res.send({ status: 'success', payload: result })
		} else {
			const id = Number(req.params.pid);
			await productsFileManager.deleteProduct(id);
			res.send({status: 'success'});
		}
	} catch (error) {
		res.status(error.httpStatusCode).send({status: `Error ${error.httpStatusCode}`, error: `${error.msg}`});
}
});

export default router;