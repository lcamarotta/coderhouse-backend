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
	createdAt: {
		type: Date,
		expires: '60m',
		default: Date.now
	}
});

export const passwordResetModel = mongoose.model(passwordResetCollection, passwordResetSchema);