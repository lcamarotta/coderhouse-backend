//dependencies
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { Server } from 'socket.io';

//files
import config from './config/config.js';
import { addLogger } from './utils/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import initializePassport from './config/passport.config.js';
import { mongoConnect, useMongoSession } from './dao/db.config.js';
import cartsRouter from './routes/api/carts.router.js';
import productsRouter from './routes/api/products.router.js';
import sessionsRouter from './routes/api/sessions.router.js';
import loggerRouter from './routes/api/logger.router.js';
import mockingProductsRouter from './routes/api/mocking-products.js';

export const app = express();
const port = Number(config.port);

export const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

await mongoConnect();
useMongoSession();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors({
  origin: config.frontendUrl,
  credentials: true, // Enable credentials (cookies)
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const io = new Server(server, {
  cors: {
    origin: config.frontendUrl,
    credentials: true, // Enable credentials (cookies)
  }
});

app.set('socketio', io);

const storedMessages = []
io.on('connection', async socket => {
  socket.on('send-message', async newMessage => {
    storedMessages.push(newMessage)
		io.emit('messageLog', storedMessages)
	});
});
app.use(addLogger);
app.use(errorHandler);

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/loggerTest', loggerRouter);
app.use('/api/mocking-products', mockingProductsRouter);
