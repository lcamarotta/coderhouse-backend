import { Router } from 'express';
import passport from "passport";
import { getCurrentUser, failLogin, failRegister, logout, registerNewUser, loginByEmail } from "../../controllers/sessions.controller.js";

const router = Router();

router.get('/current', getCurrentUser);
router.get('/logout', logout);
router.get('/faillogin', failLogin);
router.get('/failregister', failRegister);

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async(req, res) => {});
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async(req, res) => {
    req.session.user = {
        name: req.user.first_name + ' ' + req.user.last_name,
        role: req.user.role,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart
    }
    console.log(req.session.user)
    res.redirect('/products');
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), loginByEmail);
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), registerNewUser);

export default router;