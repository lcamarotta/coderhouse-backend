//dependencies
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { Server } from 'socket.io';

//files
import config from './config/config.js';
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
app.use(cors({
  origin: config.frontendUrlCors,
  credentials: true, // Enable credentials (cookies)
  }));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const io = new Server(server, {
  cors: {
    origin: config.frontendUrlCors,
    credentials: true, // Enable credentials (cookies)
    }
});
app.set('socketio', io)

io.on('connection', async socket => {
	socket.on('newMessage', async data =>{
    console.log(data)
		io.emit('messagesLog', [data])
	});
});

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);
