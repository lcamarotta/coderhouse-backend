import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { requestPasswordResetToken, validatePasswordReset } from "../services/sessions.services.js";

const getCurrentUser = async(req, res, next) => {
	try {
		if(!req.session.user){
			res.send({ status: 'success', payload: { message: 'not logged in' } });
		}else {
			res.send({ status: 'success', payload: req.session.user });
		}
	} catch (error) {
		next(error);
	}
};

const logout = async(req, res, next) => {
	try {
		req.session.destroy(error => {
			if (error) throw CustomError.createUnknownError(`${error}`, 'Could not log out');
			res.send({ status: 'success', payload: { message: 'logged out' } });
		});
	} catch (error) {
		next(error);
	}
};

const registerNewUser = (req, res, next) => {
	res.send({ status: 'success', payload: { message: 'user registered' } });
};

const loginByEmail = async(req, res, next) => {
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
		next(error);
	}
};

const passwordResetRequest = async(req, res, next) => {
	const { email } = req.body;
	try {
		if(!email) throw CustomError.createError(EErrors.BAD_REQUEST, 'Email not received');
		await requestPasswordResetToken(email);
		res.send({ status: 'success', payload: { message: 'request sent, check your email' } })
	} catch (error) {
		next(error);
	}
};

const passwordResetValidate = async(req, res, next) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	try {
		if(!newPassword || !token) throw CustomError.createError(EErrors.BAD_REQUEST, 'password is empty or token not received');
		const result = await validatePasswordReset(token, newPassword);
		if(result == -1) throw CustomError.createError(EErrors.BAD_PASSWORD, 'new password can not be the same as old password');
		res.send({ status: 'success', payload: { result } })
	} catch (error) {
		next(error);
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