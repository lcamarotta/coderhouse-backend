import config from "../config/config.js";
import winston from "winston";

const ENVIRONMENT = config.environment;
let logger;

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5
	},
	colors: {
		'fatal': 'red',
		'error': 'red',
		'warning': 'yellow',
		'info': 'green',
		'http': 'green',
		'debug': 'blue'
	}
}

if (ENVIRONMENT === 'production') {
	logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: 'info',
				format: winston.format.combine(
					winston.format.colorize({
						all: true,
						colors: customLevelOptions.colors
					}),
					winston.format.simple()
				)
			}),
			new winston.transports.File({
				filename: 'logs/errors.log',
				level: 'error'
			})
		]
	}
);

} else {
		logger = winston.createLogger({
			levels: customLevelOptions.levels,
			transports: [
				new winston.transports.Console({
					level: 'debug',
					format: winston.format.combine(
						winston.format.colorize({
							all: true,
							colors: customLevelOptions.colors
						}),
						winston.format.simple()
					)
				}),
				new winston.transports.File({
					filename: 'logs/errors.log',
					level: 'error'
				})
			]
		}
	);
}

export const addLogger = (req, res, next) => {
	req.logger = logger;
	next();
}