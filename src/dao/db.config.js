import mongoose from 'mongoose';
import config from '../config/config.js';

try {
	await mongoose.connect(config.mongoUrl);
    console.log('Connected to mongoDB');
} catch (error) {
	console.error('MongoDB connection error', error)
}