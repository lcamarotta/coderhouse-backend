//dependencies
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';

//files
import { rootDir } from './utils.js';
import viewsRouter from './routes/web/views.router.js';
import cartsRouter from './routes/api/carts.router.js';
import sessionsRouter from './routes/api/sessions.router.js';
import productsRouter from './routes/api/products.router.js';
import Message from './dao/dbManagers/messages.js';

export const app = express();
const port = 8080;
const httpServer = app.listen(port, () => console.log(`Server listening on port ${port}`));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine()); 
app.set('socketio', io)
app.set('views', rootDir('/src/views'));
app.set('view engine', 'handlebars');

app.use(express.static(rootDir('/src/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
	store: MongoStore.create({
		mongoUrl: 'mongodb+srv://lcamarotta:CcrmSx6UvtaZpKZo@codercluster.9ibjsd5.mongodb.net/?retryWrites=true&w=majority',
		mongoOptions: { useNewUrlParser: true },
		ttl: 3600
	}),
	secret: 'coderbackendSecret',
	resave: true,
	saveUninitialized: true
}));

app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

try {
	await mongoose.connect('mongodb+srv://lcamarotta:CcrmSx6UvtaZpKZo@codercluster.9ibjsd5.mongodb.net/?retryWrites=true&w=majority')
} catch (error) {
	console.error('MongoDB connection error', error)
}

io.on('connection', async socket => {
	const address = socket.handshake.address;
	console.log(`New client from ${address}`)
	
	const messageDB = new Message;

	socket.on('authenticated', async () => {
		const messages = await messageDB.getAll();
		socket.emit('messagesLog', messages)
	});

	socket.on('newMessage', async data =>{
		io.emit('messagesLog', [data])
		try {
			await messageDB.save(data)
		} catch (error) {
			throw new errorHandler(500, `${error}`)
		}

	});
});