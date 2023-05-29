import { createUserRepository, existsUserRepository, findUserByIdRepository, getUserRepository } from "../repository/sessions.repository.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";

const createUserService = async(newUser) => await createUserRepository(newUser);
const existsUserService = async(username) => await existsUserRepository(username);
const getUserService = async(username) => await getUserRepository(username);
const findUserByIdService = async(id) => await findUserByIdRepository(id);

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
    findUserByIdService
}