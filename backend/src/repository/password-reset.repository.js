import { PASSWORDDAO } from "../dao/index.js";

const validateTokenRepository = async(email, token) => await PASSWORDDAO.validateToken(email, token);
const createTokenRepository = async(email, token) => await PASSWORDDAO.create(email, token);

export {
    validateTokenRepository,
    createTokenRepository
}