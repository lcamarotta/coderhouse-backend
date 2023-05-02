import { Router } from "express";
import { productsPage, registerPage, loginPage, cartPage } from "../../controllers/views.controller.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

router.get('/', privateAccess, productsPage);

router.get('/products', privateAccess, productsPage);

router.get('/register', publicAccess, registerPage);

router.get('/login', publicAccess, loginPage);

router.get('/carts/:cid', privateAccess, cartPage);

export default router;
