import MongoCartDao from "./dbManagers/carts.dao.js";
import MongoTicketDao from "./dbManagers/tickets.dao.js";
import MongoProductsDao from "./dbManagers/products.dao.js";
import MongoUsersDao from "./dbManagers/users.dao.js";
import MongoPasswordReset from "./dbManagers/password-reset.dao.js";

const mongoCartsDao = new MongoCartDao();
const mongoTicketsDao = new MongoTicketDao();
const mongoProductsDao = new MongoProductsDao();
const mongoUsersDao = new MongoUsersDao();
const mongoPasswordReset = new MongoPasswordReset();

export const CARTDAO = mongoCartsDao;
export const TICKETDAO = mongoTicketsDao;
export const PRODUCTDAO = mongoProductsDao;
export const USERDAO = mongoUsersDao;
export const PASSWORDDAO = mongoPasswordReset;