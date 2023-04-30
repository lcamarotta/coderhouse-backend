import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from '../config/config.js';
import { app } from '../app.js';

export async function mongoConnect() {
	try {
		await mongoose.connect(config.mongoUrl);
		console.info('Connected to mongoDB');
	} catch (error) {
		console.error('MongoDB connection error', error)
	}
}

export function useMongoSession() {
	app.use(session({
		store: MongoStore.create({
			mongoUrl: config.mongoUrl,
			mongoOptions: { useNewUrlParser: true },
			ttl: 60
		}),
		secret: 'coderbackendSecret',
		resave: true,
		saveUninitialized: true
	}));
}