import { ORDERDAO } from "../dao/index.js";

const createRepository = async(email, products) => await ORDERDAO.create(email, products);
const getByEmailRepository = async(email) => await ORDERDAO.getByEmail(email);
export {
    createRepository,
    getByEmailRepository
}