import fs from 'fs';

const path = './data/data.json'
export default class ProductManager {
	constructor() {
		this.path = path
		this.products = []
	}
	
	writeFile = async() => {
		const dataToWrite = JSON.stringify(this.products)
		try {		
			await fs.promises.writeFile(path, dataToWrite)
			console.log('Success\n')
		} catch (error) {
			throw new Error(error)
		}
	}	

	getProducts = async() => {
		if(fs.existsSync(path)){
			try {
				const fileData = await fs.promises.readFile(path, 'utf-8')
				this.products = JSON.parse(fileData)
				return this.products
			} catch (error) {
				console.error(error)
				return
			}
		} else {
			console.log('File not found')
			return []
		}
	}
	
	getProductsById = async(id) => {
		await this.getProducts()
		const prodIndex = this.products.findIndex(product => product.id === id)
		if (prodIndex === -1) return 'ID not found\n'
		return this.products[prodIndex]
	}
	
	addProduct = async(title, description, price, thumbnail, code, stock) => {
		let id
		await this.getProducts()

		if (this.products.find(product => product.code === code)) {
			throw new Error('Error - code already exist')
		}
		
		if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
			throw new Error('Error - one or more fields missing')
		}

		if (this.products.length === 0) {
			id = 1;
		} else {
			id = this.products[this.products.length - 1].id + 1;
		}

		const product = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			id
		}

		this.products.push(product)
		await this.writeFile()
		return
	}

	updateProduct = async(id, title, description, price, thumbnail, code, stock) => {
		
		if (id === undefined || title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
			throw new Error('Error - one or more fields missing')
		}

		await this.getProducts()
		const prodIndex = this.products.findIndex(product => product.id === id)
		if (prodIndex === -1) return 'ID not found\n'
		this.products[prodIndex].title = title
		this.products[prodIndex].description = description
		this.products[prodIndex].price = price
		this.products[prodIndex].thumbnail = thumbnail
		this.products[prodIndex].code = code
		this.products[prodIndex].stock = stock

		await this.writeFile()
	}

	deleteProduct = async(id) => {
		await this.getProducts()
		const prodIndex = this.products.findIndex(product => product.id === id)
		if (prodIndex === -1) return 'ID not found\n'
		delete this.products[prodIndex]
		this.writeFile()
	}
}