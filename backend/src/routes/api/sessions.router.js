import { Router } from 'express';
import passport from "passport";
import { getCurrentUser, logout, registerNewUser, loginByEmail, passwordResetRequest, passwordResetValidate } from "../../controllers/sessions.controller.js";
import { auth } from "../../services/sessions.services.js";
import config from '../../config/config.js';

const router = Router();

router.get('/current', auth('public'), getCurrentUser);
router.get('/logout', auth('any'), logout);
router.get('/reset-request/:email', auth('notloggedin'), passwordResetRequest);

router.get('/github', auth('public'), passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {});
router.get('/githubcallback', auth('public'), passport.authenticate('github'), (req, res) => {
    req.session.user = {
        name: req.user.first_name + ' ' + req.user.last_name,
        role: req.user.role,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart
    }
    const url = config.frontendUrlCors
    res.redirect(url)
});

router.put('/reset-password/:email/:token', auth('notloggedin'), passwordResetValidate);
router.post('/login', auth('public'), passport.authenticate('login'), loginByEmail);
router.post('/register', auth('public'), passport.authenticate('register'), registerNewUser);

export default router;