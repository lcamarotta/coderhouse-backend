import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __path from './utils/__path.js';
import viewsRouter from './routes/views.router.js';
import APIcartsRouter from './routes/api_carts.router.js';
import APIproductsRouter from './routes/api_products.router.js';

const app = express();
const httpServer = app.listen(8080, () => console.log('Server listening on port 8080'));

export const io = new Server(httpServer);


app.engine('handlebars', handlebars.engine());
app.set('views', __path('/views'));
app.set('view engine', 'handlebars');

app.use(express.static(__path('/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', viewsRouter);
app.use('/api/carts', APIcartsRouter);
app.use('/api/products', APIproductsRouter);

io.on('connection', socket => {
    console.log('New client')
});