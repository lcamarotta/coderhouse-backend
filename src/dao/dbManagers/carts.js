import { cartModel } from "../models/carts.js";

export default class Cart {
	constructor() {
		console.log('DB Manager - CARTS')
	}
	getAll = async () => {
		const carts = await cartModel.find();
		return carts.map(cart => cart.toObject());
	}
	save = async (cart) => {
		const result = await cartModel.create(cart);
		return result;
	}
	update = async (id, cart) => {
		const result = await cartModel.updateOne({_id: id}, cart);
		return result;
	}
}