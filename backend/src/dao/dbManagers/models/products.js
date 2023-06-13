import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
	code: {
		type: String,
		unique: true
	},
	title: String,
	category: String,
	price: Number,
	stock: Number,
	description: String,
	thumbnail: Array,
	owner: {
		type: String,
		default: 'admin'
	},
	status: {
		type: Boolean,
		default: true
	}
});
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);