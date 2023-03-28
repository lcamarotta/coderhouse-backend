import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        unique: true,
        type: String
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;