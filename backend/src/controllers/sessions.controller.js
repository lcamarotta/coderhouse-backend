import { errorWithStatusCode as err } from "../utils.js";

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
            res.redirect('/products')
        });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const failLogin = (req, res) => {
    console.warn('Failed login');
    res.status(500).send({ error: 'failed login' })
};

const failRegister = (req, res) => {
    console.warn('Failed register');
    res.status(500).send({ error: 'failed' })
};

const registerNewUser = (req, res) => {
    res.send({ status: 'success' })
};

const loginByEmail = async (req, res) => {
    try {
        if(!req.user) throw new err('Invalid credentials', 401);
        req.session.user = {
            name: req.user.first_name + ' ' + req.user.last_name,
            role: req.user.role,
            age: req.user.age,
            email: req.user.email,
            cart: req.user.cart
        }
        const userSession = req.user.session;
        res.send({ status: 'success', payload: req.session.user });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};


export {
    getCurrentUser,
    logout,
    failLogin,
    failRegister,
    registerNewUser,
    loginByEmail
}