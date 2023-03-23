import fs from 'fs';
import { app } from '../../app.js';
import { errorHandler } from '../../utils.js';

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
			} catch (e) {
				throw new errorHandler(500, `${e}`);
			}
		} else {
			try {		
				this.products = [];
				await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
			} catch (e) {
				throw new errorHandler(500, `${e}`);
			}
		}
	}
	
	getProductsById = async(id) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new errorHandler(400, 'Product ID not found');
		return this.products[prodIndex];
	}
	
	addProduct = async(productToAdd) => {
		if(!productToAdd.thumbnail){
			productToAdd.thumbnail = []
		}else if (!(Array.isArray(productToAdd.thumbnail))){
			throw new errorHandler(400, 'Type of thumbnail must be array');
		}
		
		const {category, code, description, price, status , stock, title} = productToAdd;
		
		await this.getProducts();
		
		if(!isNaN(price) && !isNaN(stock)){
			productToAdd.price = Number(price);
			productToAdd.stock = Number(stock);
		} else{
			throw new errorHandler(400, 'Price and Stock must be numbers');
		}
		
		if(!category || !code || !description || !title) {
			throw new errorHandler(400, 'One or more fields missing');
		}
				
		if(this.products.find(product => product.code === code)) {
			throw new errorHandler(400, 'Code already exist');
		}
		
		if(status !== false) productToAdd.status = true;
		
		const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
		const productToAddWithID = {
			id,
			...productToAdd
		}
		
		this.products.push(productToAddWithID);
		try {		
			await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
			const io = app.get('socketio');
			io.emit('productEvent', this.products)
		} catch (e) {
			throw new errorHandler(500, `${e}`)
		}
	}

	updateProduct = async(id, updateData) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new errorHandler(400, 'Product ID not found');
		const productObjKeys = ['category', 'code', 'description', 'price', 'status' , 'stock', 'title', 'thumbnail']
		const keysToUpdate = Object.keys(updateData)
		
		productObjKeys.forEach(key => {
			const data = keysToUpdate.find( keyToUpdate => keyToUpdate === key)		
			
			if(!data) return;

			if(data === 'thumbnail'){
				if(!(Array.isArray(updateData.thumbnail))){
				throw new errorHandler(400, 'Type of thumbnail must be array');
				}
			}

			if(data === 'price'){
				if(!isNaN(updateData.price)){
					updateData.price = Number(updateData.price);
				} else{
					throw new errorHandler(400, 'Price must be a number');
				}
			}

			if(data === 'stock'){
				if(!isNaN(updateData.stock)){
					updateData.stock = Number(updateData.stock);
				} else{
					throw new errorHandler(400, 'Stock must be a number');
				}
			}
			
			if(data === 'code'){
				if(!updateData.code){
					throw new errorHandler(400, 'Code can not be empty');
				}
				
				let products = this.products.slice()
				products.splice(prodIndex, 1)
				if(products.find(product => product.code === updateData.code)) {
					throw new errorHandler(400, 'Code already exist for another product');
				}
			}

			try {
				this.products[prodIndex][key] = updateData[key]
			} catch (e) {
				console.error(e)
				throw new errorHandler(500, 'Internal Error')
			}
		});

		try {		
			await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
			const io = app.get('socketio');
			io.emit('productEvent', this.products)
		} catch (e) {
			throw new errorHandler(500, `${e}`)
		}
	}

	deleteProduct = async(id) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new errorHandler(400, 'Product ID not found')
		this.products.splice(prodIndex, 1)
		try {		
			await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
			const io = app.get('socketio');
			io.emit('productEvent', this.products)
		} catch (e) {
			throw new errorHandler(500, `${e}`)
		}
	}
}