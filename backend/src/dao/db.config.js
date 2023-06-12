import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from '../config/config.js';
import { app, server } from '../app.js';
import { logger } from '../utils/logger.js';

export async function mongoConnect() {
	try {
		logger.debug(`${new Date().toISOString()} -- conecting to mongoDBaaS...`)
		mongoose.connect(config.mongoUrl);
		logger.info(`${new Date().toISOString()} -- connected to mongoDBaaS`)
	} catch (error) {
		logger.error(`${new Date().toISOString()} -- could not connect to mongoDBaaS`)
		server.close();
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