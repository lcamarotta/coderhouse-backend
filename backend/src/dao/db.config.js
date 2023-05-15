import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from '../config/config.js';
import { app, server } from '../app.js';

export async function mongoConnect() {
	try {
		await mongoose.connect(config.mongoUrl);
		console.info('Connected to mongoDBaaS');
	} catch (error) {
		server.close(function() { console.warn('Closing Server please fix error on mongoConnect func'); });
	}
}

export function useMongoSession() {
	app.use(session({
		store: MongoStore.create({
			mongoUrl: config.mongoUrl,
			mongoOptions: { useNewUrlParser: true },
			ttl: 600
		}),
		secret: 'coderbackendSecret',
		resave: true,
		saveUninitialized: false
	}));
}