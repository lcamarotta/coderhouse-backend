import CustomError from "../../services/errors/CustomError.js";
import EErrors from "../../services/errors/enums.js";
import { cartModel } from "./models/carts.js";

export default class MongoCartDao {
	constructor() {}

	create = async () => {
		return await cartModel.create({ products: [] });
	}

	getById = async (cartId) => {
		const result = await cartModel.findOne({ _id: cartId }).populate('products.product');
		if(!result) throw CustomError.createError(EErrors.ITEM_NOT_FOUND);
		return result;
	}

	update = async (cartId, productId, quantity) => {
		if(!quantity) quantity = 1;
		
		const cart = await cartModel.findOne({ _id: cartId });
		const index = await this.isProductInCart(cartId, productId);
		if(index != -1){
			cart.products[index].quantity += Number(quantity);
		} else {
			cart.products.push({ product: productId, quantity })
		}
			
		return await cartModel.updateOne({_id: cartId}, cart);
	}

	isProductInCart = async (cartId, productId) => {
		const cart = await cartModel.findOne({ _id: cartId });
		if(!cart) throw CustomError.createError(EErrors.ITEM_NOT_FOUND);
		const index = cart.products.findIndex(product => product.product.toString() == productId);
		return index;

	}

	deleteAll = async (cartId) => {
		const cart = await cartModel.findOne({ _id: cartId });
		cart.products = [];
		return await cartModel.updateOne({_id: cartId}, cart);
	}

	deleteById = async (cartId, productId) => {
		const cart = await cartModel.findOne({ _id: cartId });
		const index = await this.isProductInCart(cartId, productId);
		if(index == -1) throw CustomError.createError(EErrors.ITEM_NOT_FOUND);
		cart.products.splice(index, 1);
		return await cartModel.updateOne({_id: cartId}, cart);
	}
}