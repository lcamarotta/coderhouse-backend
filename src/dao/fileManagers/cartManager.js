import fs from 'fs';
import ProductManager from './productManager.js';
import { errorHandler, rootDir } from '../../utils.js';

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
					this.carts = [];
				}
				return;
			} catch (e) {
				throw new errorHandler(500, `${e}`);
			}
		} else {
			try {		
				this.carts = [];
				await fs.promises.writeFile(this.pathToCartsFile, JSON.stringify(this.carts));
			} catch (e) {
				throw new errorHandler(500, `${e}`);
			}
		}
	}

    getCartById = async(id) => {
		await this.getCarts();
		const cartIndex = this.carts.findIndex(cart => cart.id === id);
		if (cartIndex === -1) throw new errorHandler(400, 'Cart ID not found');
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
			await fs.promises.writeFile(this.pathToCartsFile, JSON.stringify(this.carts));
			return id;
		} catch (e) {
			throw new errorHandler(500, `${e}`)
		}
    }

    addProductToCart = async(cid, pid) => {
		const productManager = new ProductManager(rootDir('/files/products.json'))       
		await this.getCarts();
		await productManager.getProducts();

		const prodIndex = productManager.products.findIndex(product => product.id === pid);
		if(!(prodIndex !== -1)) throw new errorHandler(400, 'Product ID not found');
		
		const cartIndex = this.carts.findIndex(cart => cart.id === cid);
		if(!(cartIndex !== -1)) throw new errorHandler(400, 'Cart ID not found');

		// if product exists in cart add quantity. Else add product to cart
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
			await fs.promises.writeFile(this.pathToCartsFile, JSON.stringify(this.carts));
		} catch (e) {
			throw new errorHandler(500, `${e}`)
		}
    }
}