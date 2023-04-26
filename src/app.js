//dependencies
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

//files
import { rootDir } from './utils.js';
import config from './config/config.js';
import cartsRouter from './routes/api/carts.router.js';
import sessionsRouter from './routes/api/sessions.router.js';
import productsRouter from './routes/api/products.router.js';
import initializePassport from './config/passport.config.js';

export const app = express();
const port = Number(config.port);

app.listen(port, () => console.log(`Server listening on port ${port}`));

app.use(express.static(rootDir('/src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);