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

		try {
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
		} catch (error) {
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
		}
	}
	
	getById = async (id) => {
		try {
			const products = await productModel.find({ _id: id });
			return products.map(product => product.toObject());
		} catch (error) {
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
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
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
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
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
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
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
		}
	}
}