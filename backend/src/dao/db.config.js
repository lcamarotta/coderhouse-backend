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
			ttl: 60
		}),
		secret: 'coderbackendSecret',
		name: 'session-id', // cookies name to be put in "key" field in postman
		cookie: {
		  maxAge: 1000 * 60 * 5, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
		  sameSite: false,
		  secure: false, // to turn on just in production
		},
		resave: true,
		saveUninitialized: false
	}));
}