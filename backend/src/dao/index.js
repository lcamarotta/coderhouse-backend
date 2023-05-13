import MongoCartDao from "./dbManagers/carts.dao.js";
import MongoProductsDao from "./dbManagers/products.dao.js";
import MongoUsersDao from "./dbManagers/users.dao.js";

const mongoCartsDao = new MongoCartDao();
const mongoProductsDao = new MongoProductsDao();
const mongoUsersDao = new MongoUsersDao();

export const CARTDAO = mongoCartsDao;
export const PRODUCTDAO = mongoProductsDao;
export const USERDAO = mongoUsersDao;