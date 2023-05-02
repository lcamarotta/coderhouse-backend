import { Router } from 'express';
import passport from "passport";
import { getCurrentUser, failLogin, failRegister, logout, registerNewUser, loginByEmail } from "../../controllers/sessions.controller.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) {
        console.log('Already authenticated');
        return res.redirect('/products');
    }
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) {
        console.log('Must be authenticated');
        return res.redirect('/login');
    }
    next();
};

router.get('/current', privateAccess, getCurrentUser);
router.get('/logout', privateAccess, logout);
router.get('/faillogin', publicAccess, failLogin);
router.get('/failregister', publicAccess, failRegister);

router.get('/github', publicAccess, passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {});
router.get('/githubcallback', publicAccess, passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = {
        name: req.user.first_name + ' ' + req.user.last_name,
        role: req.user.role,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart
    }
    res.redirect('/products');
});

router.post('/login', publicAccess, passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), loginByEmail);
router.post('/register', publicAccess, passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), registerNewUser);

export default router;