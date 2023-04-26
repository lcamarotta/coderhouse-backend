import { USERDAO } from "../dao/index.js";

const createUserService = async(newUser) => await USERDAO.create(newUser);
const existsUserService = async(username) => await USERDAO.exists(username);
const getUserService = async(username) => await USERDAO.get(username);
const findUserByIdService = async(id) => await USERDAO.findById(id);

export {
    createUserService,
    existsUserService,
    getUserService,
    findUserByIdService
}