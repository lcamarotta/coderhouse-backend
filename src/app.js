import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { rootDir } from './utils.js';
import viewsRouter from './routes/web/views.router.js';
import cartsRouter from './routes/api/carts.router.js';
import productsRouter from './routes/api/products.router.js';

export const app = express();
const httpServer = app.listen(8000, () => console.log('Server listening on port 8000'));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine()); 
app.set('socketio', io)
app.set('views', rootDir('/views'));
app.set('view engine', 'handlebars');

app.use(express.static(rootDir('/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

io.on('connection', socket => {
	console.log('New client')
});

try {
	await mongoose.connect('mongodb+srv://lcamarotta:CcrmSx6UvtaZpKZo@codercluster.9ibjsd5.mongodb.net/?retryWrites=true&w=majority')
} catch (e) {
	console.error('MongoDB connection error', e)
}