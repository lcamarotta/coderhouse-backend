//dependencies
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { Server } from 'socket.io';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

//files
import { addLogger, logger } from './utils/logger.js';
import { rootDir } from './utils/utils.js';
import { mongoConnect, useMongoSession } from './dao/db.config.js';
import config from './config/config.js';
import errorHandler from './middlewares/errorHandler.js';
import initializePassport from './config/passport.config.js';
import cartsRouter from './routes/api/carts.router.js';
import productsRouter from './routes/api/products.router.js';
import usersRouter from './routes/api/users.router.js';
import loggerRouter from './routes/api/logger.router.js';
import mockingProductsRouter from './routes/api/mocking-products.js';

export const app = express();
const port = Number(config.port);

export const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

await mongoConnect();
useMongoSession();

const swaggerOptions = {
  definition: {
      openapi: '3.0.1',
      info: {
          title: 'Coderhouse backend ecommerce',
          description: 'API'
      }
  },
  apis: [`${rootDir('../docs/**/*.yaml')}`]
}
const specs = swaggerJsdoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

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

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/loggerTest', loggerRouter);
app.use('/api/mocking-products', mockingProductsRouter);

app.use(errorHandler);