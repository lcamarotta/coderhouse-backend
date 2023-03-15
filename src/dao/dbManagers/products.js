import { errorHandler } from "../../utils.js";
import { productModel } from "../models/products.js";
import { app } from "../../app.js"

export default class Product {
	constructor() {
		console.log('DB Manager - PRODUCTS')
	}

	get = async (limit) => {
		try {
			const products = limit ? await productModel.find().limit(limit) : await productModel.find();
			return products.map(product => product.toObject());
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
	
	getById = async (id) => {
		try {
			const products = await productModel.find({ _id: id });
			return products.map(product => product.toObject());
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}

	save = async (product) => {
		try {
			const result = await productModel.create(product);
			const socketData = await this.get();
			const io = app.get('socketio');
			io.emit('productEvent', socketData)
			return result;
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
	
	update = async (id, product) => {
		try {
			const result = await productModel.updateOne({_id: id}, product);
			const socketData = await this.get();
			const io = app.get('socketio');
			io.emit('productEvent', socketData)
			return result;
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
	
	delete = async (id) => {
		try {
			const result = await productModel.deleteOne({_id: id});
			const socketData = await this.get();
			const io = app.get('socketio');
			io.emit('productEvent', socketData)
			return result;
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
}