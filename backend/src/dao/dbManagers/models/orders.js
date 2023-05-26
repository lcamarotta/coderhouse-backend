import mongoose from "mongoose";

const orderCollection = 'orders';
const orderSchema = new mongoose.Schema({
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