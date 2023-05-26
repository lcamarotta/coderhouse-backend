import { errorWithStatusCode as err } from "../../utils.js";
import { orderModel } from "./models/orders.js";

export default class MongoOrderDao {
	constructor() {}

	create = async (order) => {
		return await orderModel.create({ order });
	}

	getById = async (orderId) => {
		const result = await orderModel.findOne({ _id: orderId }).populate('products.product');
		if(!result) throw new err('Order ID not found', 400);
		return result;
	}
}