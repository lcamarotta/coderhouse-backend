import { errorHandler } from "../../utils.js";
import { productModel } from "../models/products.js";
import { app } from "../../app.js"

export default class Product {
	constructor() {
		console.log('DB Manager - PRODUCTS')
	}

	get = async (queryString, options) => {
		
		const queryObject = {}
		if (queryString) {
			const queryArray = queryString.split(':');
			if(queryArray[0] == 'stock'){
				queryObject['stock'] = { $gte: queryArray[1] };
			} else {
				queryObject[queryArray[0]] = queryArray[1];
			}
		}
		
		options = {
			...options,
			lean: true,
			customLabels: {
				docs: 'payload'
			}
		}

		const result = await productModel.paginate(queryObject, options);

		if(options.page > result.totalPages || options.page <= 0 || isNaN(options.page)) throw new errorHandler(400, 'Incorrect page request');
		
		let link = `?limit=${options.limit}`;
		if(options.sort) link = `${link}&sort=${options.sort.price}`;
		if(queryString) link = `${link}&query=${queryString}`;

		let prevLink = link;
		let nextLink = link;
		prevLink = result.hasPrevPage ? `${link}&page=${result.prevPage}` : null;
		nextLink = result.hasNextPage ? `${link}&page=${result.nextPage}` : null;
		
		return {
			...result,
			prevLink,
			nextLink
		};
	}
	
	getById = async (id) => {
		const products = await productModel.find({ _id: id });
		return products.map(product => product.toObject());
	}

	save = async (product) => {
		const result = await productModel.create(product);
		const socketData = await this.get();
		const io = app.get('socketio');
		io.emit('productEvent', socketData)
		return result;
	}
	
	update = async (id, product) => {
		const result = await productModel.updateOne({_id: id}, product);
		const socketData = await this.get();
		const io = app.get('socketio');
		io.emit('productEvent', socketData)
		return result;
	}
	
	delete = async (id) => {
		const result = await productModel.deleteOne({_id: id});
		const socketData = await this.get();
		const io = app.get('socketio');
		io.emit('productEvent', socketData)
		return result;
	}
}