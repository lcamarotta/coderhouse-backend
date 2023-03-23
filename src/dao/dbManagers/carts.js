import { errorHandler } from "../../utils.js";
import { cartModel } from "../models/carts.js";

export default class Cart {
	constructor() {
		console.log('DB Manager - CARTS')
	}

	create = async () => {
		try {
			return await cartModel.create({ products: [] });
		} catch (error) {
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
		}
	}

	getById = async (cartId) => {
		try {
			const result = await cartModel.findOne({ _id: cartId }).populate('products.product');
			if(!result) throw new errorHandler(400, 'Cart ID not found');
			return result;
		} catch (error) {
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
		}
	}

	update = async (cartId, productId, quantity) => {
		try {
			const cart = await cartModel.findOne({ _id: cartId });
			if(!cart) throw new errorHandler(400, 'Cart ID not found');

			const index = cart.products.findIndex(product => product.product.toString() == productId);
			if(index != -1){
				cart.products[index].quantity += quantity;
			} else {
				cart.products.push({ product: productId, quantity: 1 })
			}
			
			return await cartModel.updateOne({_id: cartId}, cart);
		} catch (error) {
			throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
		}
	}
}