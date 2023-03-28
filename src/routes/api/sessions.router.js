import { Router } from 'express';
import { errorHandler, rootDir } from '../../utils.js';
import router from './carts.router.js';
import userModel from '../../dao/models/users.js';

const router = Router();

router.post('/register', async(req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) throw new errorHandler(400, 'User already exists')

        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        };

        const result = await userModel.create(user);
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email, password });
        if (!user) throw new errorHandler(400, 'Incorrect username or password');
        
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
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

router.get('/logout', (req, res) => {
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