import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { requestPasswordResetToken, validatePasswordReset, modifyUserRoleService, deleteUserService, getAllUsersService, updateUserLogin } from "../services/users.services.js";
import config from '../config/config.js';

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

const getAllUsers = async(req, res, next) => {
	try {
		const result = await getAllUsersService()
		res.send({ status: 'success', payload: result });
	} catch (error) {
		next(error);
	}
};

const deleteOldUsers = async(req, res, next) => {
	try {
		const result = await deleteUserService(null)
		res.send({ status: 'success', payload: result });
	} catch (error) {
		next(error);
	}
};

const deleteUser = async(req, res, next) => {
	const email = req.params.email;
	try {
		console.log(email);
		if(!email || email == ':email') throw CustomError.createError(EErrors.BAD_REQUEST, 'Did not send user email');
		const result = await deleteUserService(email)
		res.send({ status: 'success', payload: result });
	} catch (error) {
		next(error);
	}
};

const modifyUserRole = async(req, res, next) => {
	const uid = req.params.uid;
	try {
		if(!uid || uid == ':uid') throw CustomError.createError(EErrors.BAD_REQUEST, 'Did not send user ID');
		if(req.session.user.role != 'admin') throw CustomError.createError(EErrors.FORBIDDEN, 'Logged user (session) must be admin to switch other users roles by id');
		const result = await modifyUserRoleService(uid);
		if(req.session.user._id == uid) req.session.user.role = result;
		res.send({ status: 'success', payload: `New role ${result}` });
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
		updateUserLogin(req.user);
		req.session.user = {
			name: req.user.first_name + ' ' + req.user.last_name,
			role: req.user.role,
			age: req.user.age,
			email: req.user.email,
			cart: req.user.cart,
			orders: req.user.orders,
			_id: req.user._id
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

const githubCallback = (req, res) => {
	updateUserLogin(req.user);
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
};

function auth(role) {
	switch (role) {
		//anyone can access endpoint
		case 'public':
			return function(req, res, next){
				return next();
			}

		//to access endpoint user must not be logged in
		case 'notloggedin':
			return function(req, res, next){
				if(req.session.user) throw CustomError.createError(EErrors.USER_AREADY_LOGGED);
				return next();
			}

		//to access endpoint user must be logged in with any role
		case 'any':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				return next();
			}

		//to access endpoint user must be logged in with role 'user'
		case 'user':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				if(req.session.user.role == 'user') return next();
				throw CustomError.createError(EErrors.FORBIDDEN);
			}

		//to access endpoint user must be logged in with role 'admin'
		case 'admin':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				if(req.session.user.role == 'admin') return next();
				throw CustomError.createError(EErrors.USER_MUST_BE_ADMIN);
			}

		//to access endpoint user must be logged in with role 'premium'
		case 'premium':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				if(req.session.user.role == 'premium') return next();
				throw CustomError.createError(EErrors.USER_MUST_BE_PREMIUM);
			}

		default:
			throw CustomError.createError(EErrors.SERVER_ERROR);
	}
}

export {
	auth,
	githubCallback,
	getCurrentUser,
	logout,
	registerNewUser,
	loginByEmail,
	passwordResetRequest,
	passwordResetValidate,
	modifyUserRole,
	deleteOldUsers,
	deleteUser,
	getAllUsers
}