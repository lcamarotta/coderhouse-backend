import { errorWithStatusCode as err, make_id } from "../../utils.js";
import { ticketModel } from "./models/tickets.js";

export default class MongoOrderDao {
	constructor() {}

	createPurchase = async (email, products) => {
		let totalAmount = 0;
		products.map( item => totalAmount += item.quantity * item.product.price );

		const purchaseOrder = {
			purchaser: email,
			products,
			amount: totalAmount,
			code: make_id(15)
		}

		return await ticketModel.create(purchaseOrder);
	}

	getPurchaseByEmail = async (user_email) => {
		const result = await ticketModel.find({ purchaser: user_email }).populate('products.product');
		if(!result) throw new err('Order ID not found', 400);
		return result;
	}
}