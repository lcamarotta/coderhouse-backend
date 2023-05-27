import { errorWithStatusCode as err } from "../../utils.js";
import { orderModel } from "./models/orders.js";

export default class MongoOrderDao {
	constructor() {}

	create = async (email, products) => {
		return await orderModel.create({ user_email: email, order: products });
	}

	getByEmail = async (user_email) => {
		const result = await orderModel.find({ user_email: user_email }).populate('order.product');
		if(!result) throw new err('Order ID not found', 400);
		return result;
	}
}