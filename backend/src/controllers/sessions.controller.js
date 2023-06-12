import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { existsUserService, requestPasswordResetToken, validatePasswordReset } from "../services/sessions.services.js";

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

const loginByEmail = async(req, res) => {
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

const passwordResetRequest = async(req, res) => {
	const { email } = req.params;
	try {

		if(!email) throw CustomError.createError(EErrors.BAD_REQUEST);
		const checkEmail = await existsUserService(email);

		if(!checkEmail) throw CustomError.createError(EErrors.USER_NOT_EXIST);
		const result = await requestPasswordResetToken(email);
		
    req.logger.debug(`passwordRequest controller, email:${email} checkEmail: ${checkEmail}`);

		res.send({ status: 'success', payload: { message: 'request sent, check your email' } })
	} catch (error) {
		req.logger.error(error)
		throw CustomError.createError(EErrors.SERVER_ERROR);
	}
};

const passwordResetValidate = async(req, res) => {
	const { email, token } = req.params;
	const newPassword = req.body;

	try {
		if(!email || !token) throw CustomError.createError(EErrors.BAD_REQUEST);
		const result = validatePasswordReset(email, token, newPassword);
		if(result = -1) throw CustomError.createError(EErrors.BAD_REQUEST);
		res.send({ status: 'success', payload: { message: 'password changed, now login' } })
	} catch (error) {
		req.logger.error(error)
		throw CustomError.createError(EErrors.SERVER_ERROR);
	}

};

export {
	getCurrentUser,
	logout,
	registerNewUser,
	loginByEmail,
	passwordResetRequest,
	passwordResetValidate
}