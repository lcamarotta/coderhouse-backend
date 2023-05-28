import mongoose from "mongoose";

const ticketCollection = 'tickets';
const ticketSchema = new mongoose.Schema({
    purchaser: {
        type: String,
        required: true
    },
    products: [
        {
            quantity: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        }
    ],
    amount: {
        type: Number
    },
    code: {
        type: String,
        unique: true
    }
});

ticketSchema.set('timestamps', true);

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);