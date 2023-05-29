import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";

const getCurrentUser = async(req, res) => {
    try {
        if(!req.session.user){
            res.send({ status: 'success', payload: { message: 'not logged in' } });
        }else {
            res.send({ status: 'success', payload: req.session.user });
        }
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const logout = async(req, res) => {
    try {
        req.session.destroy(error => {
            if (error) throw CustomError.createUnknownError(`${error}`);
            res.send({ status: 'success', payload: { message: 'logged out' } });
        });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const registerNewUser = (req, res) => {
    res.send({ status: 'success', payload: { message: 'user registered' } });
};

const loginByEmail = async (req, res) => {
    try {
        if(!req.user) throw CustomError.createError(EErrors.INVALID_CREDENTIALS);
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
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};


export {
    getCurrentUser,
    logout,
    registerNewUser,
    loginByEmail
}