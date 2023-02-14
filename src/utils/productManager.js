import fs from 'fs';
import customError from './customError.js'
import writeDataToFile from './writeDataToFile.js';

export default class ProductManager {
	constructor(pathToProductsFile) {
		this.pathToProductsFile = pathToProductsFile;
		this.products = [];
	}
	
	getProducts = async() => {
		if(fs.existsSync(this.pathToProductsFile)){
			try {
				const fileData = await fs.promises.readFile(this.pathToProductsFile, 'utf-8');
				if(Boolean(fileData)){
					this.products = JSON.parse(fileData);
				}else{
					this.products = [];
				}
				return;
			} catch (error) {
				console.error(error);
				throw new customError(500, 'Internal Error');
			}
		} else {
			this.products = [];
			return;
		}
	}
	
	getProductsById = async(id) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new customError(400, 'Product ID not found');
		return this.products[prodIndex];
	}
	
	addProduct = async(productToAdd) => {
		if (productToAdd.thumbnail === undefined){
			productToAdd.thumbnail = []
		}else if (!(Array.isArray(productToAdd.thumbnail))){
			throw new customError(400, 'Type of thumbnail must be array');
		}
		
		const {category, code, description, price, status , stock, title} = productToAdd;
		
		await this.getProducts();
		
		if (this.products.find(product => product.code === code)) {
			throw new customError(400, 'Code already exist');
		}
		
		if(!isNaN(price) && !isNaN(stock)){
			productToAdd.price = Number(price)
			productToAdd.stock = Number(stock)
		} else{
			throw new customError(400, 'Price and Stock must be numbers')
		}
		
		if (category === undefined || code === undefined || description === undefined || title === undefined) {
			throw new customError(400, 'One or more fields missing');
		}
		
		if (status !== false) productToAdd.status = true;
		
		const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
		const productToAddWithID = {
			id,
			...productToAdd
		}
		
		this.products.push(productToAddWithID);
		try {
			await writeDataToFile(this.pathToProductsFile, JSON.stringify(this.products));
		} catch (e) {
			throw new customError(e.httpStatusCode, e.msg);
		}
	}

	updateProduct = async(id, updateData) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new customError(400, 'Product ID not found');
		
		const productObjKeys = ['category', 'code', 'description', 'price', 'status' , 'stock', 'title', 'thumbnail']
		const keysToUpdate = Object.keys(updateData)
		
		productObjKeys.forEach(key => {
			const data = keysToUpdate.find( keyToUpdate => keyToUpdate === key)		
			if(data === undefined) return;
			this.products[prodIndex][key] = updateData[key]
		});

		try {
			await writeDataToFile(this.pathToProductsFile, JSON.stringify(this.products));
		} catch (e) {
			throw new customError(e.httpStatusCode, e.msg);
		}
	}

	deleteProduct = async(id) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new customError(400, 'Product ID not found')
		this.products.splice(prodIndex, 1)
		try {
			await writeDataToFile(this.pathToProductsFile, JSON.stringify(this.products));
		} catch (e) {
			throw new customError(e.httpStatusCode, e.msg);
		}
	}
}