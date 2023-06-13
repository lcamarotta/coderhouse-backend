import { createUserRepository, existsUserRepository, findUserByIdRepository, getUserRepository, updateUser } from "../repository/sessions.repository.js";
import { createTokenRepository, validateTokenRepository } from "../repository/password-reset.repository.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { createHash } from "../utils/utils.js";
import { mail_password_reset } from "./mailer.services.js";
import { logger } from "../utils/logger.js";

const createUserService = async(newUser) => await createUserRepository(newUser);
const existsUserService = async(username) => await existsUserRepository(username);
const getUserService = async(username) => await getUserRepository(username);
const findUserByIdService = async(id) => await findUserByIdRepository(id);

const changeUserPasswordService = async(email, newPassword) => {
	const user = await getUserService(email);
	user.password = createHash(newPassword);
	const result = await updateUser(user);
	return result;
};

const validatePasswordReset = async(email, token, newPassword) => {

	const isTokenValid = await validateTokenRepository(email, token);
	if(!isTokenValid) throw CustomError.createError(EErrors.BAD_REQUEST, 'Invalid token');

	const result = await changeUserPasswordService(email, newPassword);
	logger.debug(`changePassword Service: ${result}`);
	return result
};

const requestPasswordResetToken = async(email) => {
	const token = createHash(email);
	logger.debug(`token: ${token}`);
	createTokenRepository(email, token);
	mail_password_reset(email, token)
	return
};

function auth(role) {
	switch (role) {
		case 'public':
			return function(req, res, next){
				return next();
			}

		case 'notloggedin':
			return function(req, res, next){
				if(req.session.user) throw CustomError.createError(EErrors.USER_AREADY_LOGGED);
				return next();
			}

		case 'any':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				return next();
			}

		case 'user':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				if(req.session.user.role == 'user') return next();
				throw CustomError.createError(EErrors.FORBIDDEN);
			}

		case 'admin':
			return function(req, res, next){
				if(!req.session.user) throw CustomError.createError(EErrors.USER_NOT_LOGGED);
				if(req.session.user.role == 'admin') return next();
				throw CustomError.createError(EErrors.USER_MUST_BE_ADMIN);
			}
	
		default:
			throw CustomError.createError(EErrors.SERVER_ERROR);
	}
  }

export {
	auth,
	createUserService,
	existsUserService,
	getUserService,
	findUserByIdService,
	validatePasswordReset,
	requestPasswordResetToken
}