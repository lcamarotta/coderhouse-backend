import { messageModel } from "../models/messages.js";

export default class Message {
	constructor() {
		console.log('DB Manager - MESSAGES')
	}
	getAll = async () => {
		const messages = await messageModel.find();
		return messages.map(message => message.toObject());
	}
	save = async (message) => {
		const result = await messageModel.create(message);
		return result;
	}
}