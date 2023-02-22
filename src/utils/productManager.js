import fs from 'fs';
import { io } from '../app.js';
import __error from './__error.js';

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
				throw new __error(500, `${e}`);
			}
		} else {
			try {		
				this.products = [];
				await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
			} catch (e) {
				throw new __error(500, `${e}`);
			}
		}
	}
	
	getProductsById = async(id) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new __error(400, 'Product ID not found');
		return this.products[prodIndex];
	}
	
	addProduct = async(productToAdd) => {
		if(productToAdd.thumbnail === undefined){
			productToAdd.thumbnail = []
		}else if (!(Array.isArray(productToAdd.thumbnail))){
			throw new __error(400, 'Type of thumbnail must be array');
		}
		
		const {category, code, description, price, status , stock, title} = productToAdd;
		
		await this.getProducts();
		
		if(!isNaN(price) && !isNaN(stock)){
			productToAdd.price = Number(price);
			productToAdd.stock = Number(stock);
		} else{
			throw new __error(400, 'Price and Stock must be numbers');
		}
		
		if(category === undefined || code === undefined || code === '' || description === undefined || title === undefined) {
			throw new __error(400, 'One or more fields missing');
		}
				
		if(this.products.find(product => product.code === code)) {
			throw new __error(400, 'Code already exist');
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
		} catch (e) {
			throw new __error(500, `${e}`)
		}
		io.emit('productEvent', this.products)
	}

	updateProduct = async(id, updateData) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new __error(400, 'Product ID not found');
		const productObjKeys = ['category', 'code', 'description', 'price', 'status' , 'stock', 'title', 'thumbnail']
		const keysToUpdate = Object.keys(updateData)
		
		productObjKeys.forEach(key => {
			const data = keysToUpdate.find( keyToUpdate => keyToUpdate === key)		
			
			if(data === undefined) return;

			if(data === 'thumbnail'){
				if(!(Array.isArray(updateData.thumbnail))){
				throw new __error(400, 'Type of thumbnail must be array');
				}
			}

			if(data === 'price'){
				if(!isNaN(updateData.price)){
					updateData.price = Number(updateData.price);
				} else{
					throw new __error(400, 'Price must be a number');
				}
			}

			if(data === 'stock'){
				if(!isNaN(updateData.stock)){
					updateData.stock = Number(updateData.stock);
				} else{
					throw new __error(400, 'Stock must be a number');
				}
			}
			
			if(data === 'code'){
				if(updateData.code === ''){
					throw new __error(400, 'Code can not be empty');
				}
				
				let products = this.products.slice()
				products.splice(prodIndex, 1)
				if(products.find(product => product.code === updateData.code)) {
					throw new __error(400, 'Code already exist for another product');
				}
			}

			try {
				this.products[prodIndex][key] = updateData[key]
			} catch (e) {
				console.error(e)
				throw new __error(500, 'Internal Error')
			}
		});

		try {		
			await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
		} catch (e) {
			throw new __error(500, `${e}`)
		}
		io.emit('productEvent', this.products)
	}

	deleteProduct = async(id) => {
		await this.getProducts();
		const prodIndex = this.products.findIndex(product => product.id === id);
		if (prodIndex === -1) throw new __error(400, 'Product ID not found')
		this.products.splice(prodIndex, 1)
		try {		
			await fs.promises.writeFile(this.pathToProductsFile, JSON.stringify(this.products));
		} catch (e) {
			throw new __error(500, `${e}`)
		}
		io.emit('productEvent', this.products)
	}
}