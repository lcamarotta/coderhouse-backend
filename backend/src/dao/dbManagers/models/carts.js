import mongoose from "mongoose";

const cartCollection = 'carts';
const cartSchema = new mongoose.Schema({
    products: [
        {
            quantity: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        }
    ]
});
export const cartModel = mongoose.model(cartCollection, cartSchema);