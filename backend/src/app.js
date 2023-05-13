//dependencies
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import handlebars from 'express-handlebars';

//files
import { rootDir } from './utils.js';
import config from './config/config.js';
import viewsRouter from './routes/web/views.router.js'
import cartsRouter from './routes/api/carts.router.js';
import sessionsRouter from './routes/api/sessions.router.js';
import productsRouter from './routes/api/products.router.js';
import initializePassport from './config/passport.config.js';
import { mongoConnect, useMongoSession } from './dao/db.config.js';

export const app = express();
const port = Number(config.port);

export const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

await mongoConnect();
useMongoSession();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(rootDir('/src/public')));
app.use(cors());

app.engine('handlebars', handlebars.engine());
app.set('views', rootDir('/src/views'));
app.set('view engine', 'handlebars');

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);
