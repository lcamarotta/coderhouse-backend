import mongoose from "mongoose";

const orderCollection = 'orders';
const orderSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    order: [
        {
            quantity: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        }
    ]
});
export const orderModel = mongoose.model(orderCollection, orderSchema);