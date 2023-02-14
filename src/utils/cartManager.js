import fs from 'fs';
import pathToFile from './pathToFile.js';
import customError from './customError.js'
import ProductManager from './productManager.js';
import writeDataToFile from './writeDataToFile.js';

export default class CartManager {
	constructor(pathToCartsFile) {
		this.pathToCartsFile = pathToCartsFile;
		this.carts = [];
	}
	
	getCarts = async() => {
		if(fs.existsSync(this.pathToCartsFile)){
			try {
				const fileData = await fs.promises.readFile(this.pathToCartsFile, 'utf-8');
				if(Boolean(fileData)){
					this.carts = JSON.parse(fileData);
				}else {
					this.carts = []
				}
				return;
			} catch (error) {
				throw new customError(500, `${error}`);
			}
		} else {
			this.carts = [];
			return;
		}
	}

    getCartById = async(id) => {
		await this.getCarts();
		const cartIndex = this.carts.findIndex(cart => cart.id === id);
		if (cartIndex === -1) throw new customError(400, 'Cart ID not found');
		return this.carts[cartIndex];
	}

    addCart = async() => {
        await this.getCarts();
        
        const id = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
		const newCart = {
			id,
			products: []
		}
        this.carts.push(newCart);
		try {
			await writeDataToFile(this.pathToCartsFile, JSON.stringify(this.carts));
            return id
		} catch (e) {
			throw new customError(e.httpStatusCode, e.msg);
		}
    }

    addProductToCart = async(cid, pid) => {
		const productManager = new ProductManager(pathToFile('/data/products.json'))
        
		await this.getCarts();
		await productManager.getProducts();
		
		const prodIndex = productManager.products.findIndex(product => product.id === pid);
		if(!(prodIndex !== -1)) throw new customError(400, 'Product ID not found');
		
		const cartIndex = this.carts.findIndex(cart => cart.id === cid);
		if(!(cartIndex !== -1)) throw new customError(400, 'Cart ID not found');
		
		const productInCartIndex = this.carts[cartIndex].products.findIndex(product => product.product === pid)
		if(productInCartIndex !== -1){
			this.carts[cartIndex].products[productInCartIndex].quantity++
		}else{
			const productToAdd = {
				product: pid,
				quantity: 1
			}
			this.carts[cartIndex].products.push(productToAdd)
		}
		try {
			await writeDataToFile(this.pathToCartsFile, JSON.stringify(this.carts));
		} catch (e) {
			throw new customError(e.httpStatusCode, e.msg);
		}
    }
}