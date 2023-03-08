import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __path from './utils/__path.js';
import viewsRouter from './routes/web/views.router.js';
import cartsRouter from './routes/api/carts.router.js';
import productsRouter from './routes/api/products.router.js';

export const app = express();
const httpServer = app.listen(8080, () => console.log('Server listening on port 8080'));

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('socketio', io)
app.set('views', __path('/views'));
app.set('view engine', 'handlebars');

app.use(express.static(__path('/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

io.on('connection', socket => {
    console.log('New client')
});