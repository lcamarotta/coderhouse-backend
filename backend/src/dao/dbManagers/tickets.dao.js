import { faker } from '@faker-js/faker';
import { ticketModel } from "./models/tickets.js";
import CustomError from '../../services/errors/CustomError.js';
import EErrors from '../../services/errors/enums.js';

export default class MongoOrderDao {
	constructor() {}

	createPurchase = async (email, products) => {
		let totalAmount = 0;
		products.map( item => totalAmount += item.quantity * item.product.price );

		const purchaseOrder = {
			purchaser: email,
			products,
			amount: totalAmount,
			code: faker.string.alphanumeric(10)
		}

		return await ticketModel.create(purchaseOrder);
	}

	getPurchaseByEmail = async (user_email) => {
		const result = await ticketModel.find({ purchaser: user_email }).populate('products.product');
		if(!result) throw CustomError.createError(EErrors.ITEM_NOT_FOUND);
		return result;
	}
}