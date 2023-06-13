import mongoose from "mongoose";

const passwordResetCollection = 'passwordReset';

const passwordResetSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	token: {
		type: String,
		unique: true
	},
	expireAfterSeconds: {
    type: Date,
    default: new Date(),
	}
});
passwordResetSchema.set('timestamps', true);

export const passwordResetModel = mongoose.model(passwordResetCollection, passwordResetSchema);