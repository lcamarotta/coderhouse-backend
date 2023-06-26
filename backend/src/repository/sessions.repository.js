import { USERDAO } from "../dao/index.js";

const createUserRepository = async(newUser) => await USERDAO.create(newUser);
const existsUserRepository = async(username) => await USERDAO.exists(username);
const getUserRepository = async(username) => await USERDAO.get(username);
const findUserByIdRepository = async(id) => await USERDAO.findById(id);
const updateUser = async(user) => await USERDAO.update(user);
const deleteUser = async(email) => await USERDAO.delete(email);

export {
    createUserRepository,
    existsUserRepository,
    getUserRepository,
    findUserByIdRepository,
    updateUser,
    deleteUser
}