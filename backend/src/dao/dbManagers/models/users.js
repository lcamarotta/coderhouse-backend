import mongoose from "mongoose";

const userCollection = 'users';
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: null
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    password: String,
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;