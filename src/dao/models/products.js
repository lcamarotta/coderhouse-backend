import mongoose from "mongoose";

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
	status: Boolean
});

export const productModel = mongoose.model(productCollection, productSchema);