import { messagesModel } from "../models/messages.js";

export default class Messages {
  constructor() {
    console.log('Messages constructor')
  }
  getAll = async () => {
    const messages = await messagesModel.find();
    return messages.map(message => message.toObject());
  }
  save = async (message) => {
    const result = await messagesModel.create(message);
    return result;
  }
  update = async (id, message) => {
    const result = await messagesModel.updateOne({_id: id}, message);
    return result;
  }
}