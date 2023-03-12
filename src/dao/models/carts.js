import mongoose from "mongoose";

const messageCollection = 'messages';
const messagesSchemas = new mongoose.Schema({

});
export const messagesModel = mongoose.model(messageCollection, messagesSchemas);