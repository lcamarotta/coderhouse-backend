import { Router } from 'express';
import passport from "passport";
import { getCurrentUser, logout, registerNewUser, loginByEmail, passwordResetRequest, passwordResetValidate, modifyUserRole, deleteTestUser } from "../../controllers/sessions.controller.js";
import { auth } from "../../services/sessions.services.js";
import config from '../../config/config.js';

const router = Router();

router.get('/premium/:uid', auth('any'), modifyUserRole);
router.get('/current', auth('public'), getCurrentUser);
router.get('/logout', auth('any'), logout);

router.get('/github', auth('public'), passport.authenticate('github', { scope: ['user: email'] }), (req, res) => {});
router.get('/githubcallback', auth('public'), passport.authenticate('github'), (req, res) => {
    req.session.user = {
        name: req.user.first_name + ' ' + req.user.last_name,
        role: req.user.role,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart,
        _id: req.user._id
    }
    const url = config.frontendUrl
    res.redirect(url)
});

router.put('/reset-request', auth('notloggedin'), passwordResetRequest);
router.put('/reset-password/:token', auth('notloggedin'), passwordResetValidate);
router.post('/login', auth('public'), passport.authenticate('login'), loginByEmail);
router.post('/register', auth('public'), passport.authenticate('register'), registerNewUser);

router.delete('/delete', deleteTestUser);

export default router;