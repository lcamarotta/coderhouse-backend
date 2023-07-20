import { createUserRepository, deleteUser, existsUserRepository, findUserByIdRepository, getUserRepository, updateUser } from "../repository/users.repository.js";
import { createTokenRepository, validateTokenRepository, deleteTokenRepository } from "../repository/password-reset.repository.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";
import { checkPwd, createHash, generateRandomToken } from "../utils/utils.js";
import { mail_password_reset } from "./mailer.services.js";
import { logger } from "../utils/logger.js";

const createUserService = async(newUser) => await createUserRepository(newUser);
const existsUserService = async(username) => await existsUserRepository(username);
const getUserService = async(username) => await getUserRepository(username);
const findUserByIdService = async(id) => await findUserByIdRepository(id);
const deleteUserService = async(email) => await deleteUser(email);

const modifyUserRoleService = async(id) => {
	const user = await findUserByIdService(id);
	if(!user) throw CustomError.createError(EErrors.BAD_REQUEST, 'User does not exist');
	logger.debug(`modifyUserRoleService user: ${user}`)
	if(user.role == 'admin'){
		user.role = 'premium';
		const result = await updateUser(user)
		logger.debug(result);
		return 'premium'
	}
	else{
		user.role = 'admin';
		const result = await updateUser(user)
		logger.debug(result);
		return 'admin'
	}
}

const changeUserPasswordService = async(email, newPassword) => {
	const user = await getUserService(email);
	if(checkPwd(user.password, newPassword)) throw CustomError.createError(EErrors.BAD_PASSWORD, 'new password can not be the same as old password');
	user.password = createHash(newPassword);
	const result = await updateUser(user);
	logger.debug(`changePassword Service: ${result}`);
	return result;
};

const validatePasswordReset = async(codedToken, newPassword) => {
	const splitToken = codedToken.split('&-&');
	const token = splitToken[0];
	const email = splitToken[1];

	logger.debug(`validatePasswordReset decoded email: ${email}, token: ${token}`)

	const isTokenValid = await validateTokenRepository(email, token);
	if(!isTokenValid) throw CustomError.createError(EErrors.BAD_REQUEST, 'Invalid token');
	
	try {
		const result = await changeUserPasswordService(email, newPassword);
		
		//delete used token
		const deleteTokenResult = deleteTokenRepository(email);
		logger.debug(`Delete used token: ${deleteTokenResult}`);

		return result;
	} catch (error) {
		return -1
	}

};

const requestPasswordResetToken = async(email) => {
	const checkEmail = await existsUserService(email);
	if(!checkEmail) throw CustomError.createError(EErrors.USER_NOT_EXIST);

	const token = generateRandomToken(25)
	const mailerToken = `${token}&-&${email}`

	logger.debug(`token: ${token}, email: ${email}, mailerToken: ${mailerToken}`);

	await createTokenRepository(email, token);
	mail_password_reset(email, mailerToken);
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
	createUserService,
	existsUserService,
	getUserService,
	findUserByIdService,
	validatePasswordReset,
	requestPasswordResetToken,
	modifyUserRoleService,
	deleteUserService
}