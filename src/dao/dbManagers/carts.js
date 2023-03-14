import { errorHandler } from "../../utils.js";
import { cartModel } from "../models/carts.js";

export default class Cart {
	constructor() {
		console.log('DB Manager - CARTS')
	}
	getById = async (id) => {
		try {
			const cart = await cartModel.find({_id: id});
			return cart;
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
	create = async () => {
		try {
			const result = await cartModel.create({
				products: []
			});
			return result;
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
	update = async (cid, pid) => {
		try {
			const cart = await cartModel.findOne({ _id: cid })
			cart.products.push({ product: pid })
			return await cartModel.updateOne({_id: cid}, cart);
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}
	}
}