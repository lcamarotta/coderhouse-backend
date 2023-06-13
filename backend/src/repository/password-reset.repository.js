import { PASSWORDDAO } from "../dao/index.js";

const validateTokenRepository = async(email, token) => await PASSWORDDAO.validateToken(email, token);
const createTokenRepository = async(email, token) => await PASSWORDDAO.create(email, token);
const deleteTokenRepository = async(email) => await PASSWORDDAO.delete(email);

export {
    validateTokenRepository,
    deleteTokenRepository,
    createTokenRepository
}