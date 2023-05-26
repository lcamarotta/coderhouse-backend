import { errorWithStatusCode as err } from "../utils.js";

const getCurrentUser = async(req, res) => {
    try {
        if(!req.session.user){
            res.send({ status: 'success', payload: { message: 'not logged in' } });
        }else {
            res.send({ status: 'success', payload: req.session.user });
        }
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const logout = async(req, res) => {
    try {
        req.session.destroy(error => {
            if (error) throw new err(`${error}`, 500);
            res.send({ status: 'success', payload: { message: 'logged out' } });
        });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const registerNewUser = (req, res) => {
    res.send({ status: 'success', payload: { message: 'user registered' } });
};

const loginByEmail = async (req, res) => {
    try {
        if(!req.user) throw new err('Invalid credentials', 401);
        req.session.user = {
            name: req.user.first_name + ' ' + req.user.last_name,
            role: req.user.role,
            age: req.user.age,
            email: req.user.email,
            cart: req.user.cart,
            orders: req.user.orders
        }
        res.send({ status: 'success', payload: req.session.user });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};


export {
    getCurrentUser,
    logout,
    registerNewUser,
    loginByEmail
}