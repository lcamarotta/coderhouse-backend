import { errorWithStatusCode as err } from "../utils.js";
import passport from "passport";

const getCurrentUser = async(req, res) => {
    try {
        res.send(req.session.user);
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const logout = async(req, res) => {
    try {
        req.session.destroy(error => {
            if (error) throw new err(`${error}`, 500);
            res.redirect('/')
        });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const failLogin = (req, res) => {
    console.warn('Failed login');
    res.send({ error: 'failed login' })
};

const failRegister = (req, res) => {
    console.warn('Failed Strategy');
    res.send({ error: 'failed' })
};

const loginByGithub = (
    passport.authenticate('github', { scope: ['user: email'] }),
    async(req, res) => {}
);

const loginByGithubCallback = (
    passport.authenticate('github', { failureRedirect: '/login' }),
    async(req, res) => {
        req.session.user = {
            name: req.user.first_name + ' ' + req.user.last_name,
            role: req.user.role,
            age: req.user.age,
            email: req.user.email,
            cart: req.user.cart
        }
        res.redirect('/');
    }
);

const registerNewUser = (
    passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }),
    (req, res) => {
        res.send({ status: 'success' })
    }
);

const loginByEmail = (
    passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }),
    async (req, res) => {
        try {
            if(!req.user) throw new err('Invalid credentials', 401);
            req.session.user = {
                name: req.user.first_name + ' ' + req.user.last_name,
                role: req.user.role,
                age: req.user.age,
                email: req.user.email,
                cart: req.user.cart
            }
            res.send({ status: 'success', payload: req.session.user });
        } catch (error) {
            res.status(error.httpStatusCode || 500).send({ error: error.message });
        }
    }
);


export {
    getCurrentUser,
    logout,
    failLogin,
    failRegister,
    loginByGithub,
    loginByGithubCallback,
    registerNewUser,
    loginByEmail
}