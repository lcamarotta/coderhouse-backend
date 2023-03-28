import { Router } from 'express';
import User from '../../dao/dbManagers/users.js';
import { errorHandler } from '../../utils.js';

const router = Router();

const userDB = new User;

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

router.post('/register', publicAccess, async(req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        if (await userDB.exists(email)) throw new errorHandler(400, 'User already exists');
        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        };

        const result = await userDB.create(user);
        res.send({ status: 'success', result })
    } catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	
    }
});

router.post('/login', publicAccess, async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) throw new errorHandler(400, 'Incomplete values');
        const user = await userDB.get( email, password );
        req.session.user = {
            name: user.name,
            email: user.email,
            age: user.age,
            role: user.role
        };

        res.send({ status: 'success', message: 'login success' });
    } catch (error) {
		res
			.status(error.httpStatusCode || 500)
			.send({
				status: `Error ${error.httpStatusCode || 500}`,
				payload: `${error.msg || error}`
			});
	
    }
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

export default router;