//dependencies
import express from 'express';
import passport from 'passport';
// import cors from 'cors';

//files
import { rootDir } from './utils.js';
import config from './config/config.js';
import cartsRouter from './routes/api/carts.router.js';
import sessionsRouter from './routes/api/sessions.router.js';
import productsRouter from './routes/api/products.router.js';
import initializePassport from './config/passport.config.js';
import { mongoConnect, useMongoSession } from './dao/db.config.js';

export const app = express();
const port = Number(config.port);

export const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(rootDir('/src/public')));

await mongoConnect();
useMongoSession();

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);