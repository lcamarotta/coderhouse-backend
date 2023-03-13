import { productModel } from "../models/products.js";

export default class Product {
	constructor() {
		console.log('DB Manager - PRODUCTS')
	}

	getAll = async () => {
		const products = await productModel.find();
		return products.map(product => product.toObject());
	}

	save = async (product) => {
		const result = await productModel.create(product);
		return result;
	}

	update = async (id, product) => {
		const result = await productModel.updateOne({_id: id}, product);
		return result;
	}
}