import { Router } from 'express';
import User from '../../dao/dbManagers/users.js';
import { errorHandler } from '../../utils.js';
import passport from 'passport';

const router = Router();
const userManager = new User;

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

router.post('/register', publicAccess, passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), (req, res) => {
    res.send({ status: 'success' })
});

router.post('/login', publicAccess, passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    try {
        if(!req.user) throw new errorHandler(401, 'Invalid credentials');
        req.session.user = {
            name: req.user.first_name + ' ' + req.user.last_name,
            role: req.user.role,
            age: req.user.age,
            email: req.user.email
        }
        res.send({ status: 'success', payload: req.session.user });
    } catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	
    }
});

router.get('/faillogin', (req, res) => {
    console.log('Failed login');
    res.send({ error: 'failed login' })
});

router.get('/failregister', (req, res) => {
    console.log('Failed Strategy');
    res.send({ error: 'failed' })
});

router.get('/logout', privateAccess, (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) throw new errorHandler(500, `${err}`);
            res.redirect('/')
        });
    } catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	
    }
});

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async(req, res) => {});
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async(req, res) => {
    req.session.user = {
        name: req.user.first_name + ' ' + req.user.last_name,
        role: req.user.role,
        age: req.user.age,
        email: req.user.email
    }
    res.redirect('/');
});

export default router;