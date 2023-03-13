import mongoose from "mongoose";

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true
	},
	username: String,
	message: String
});

export const messageModel = mongoose.model(messageCollection, messageSchema);