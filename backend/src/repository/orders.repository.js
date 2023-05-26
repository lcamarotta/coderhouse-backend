import { ORDERDAO } from "../dao/index.js";

const createOrderRepository = async() => await ORDERDAO.create();
const getOrderByIdRepository = async(cid) => await ORDERDAO.getById(cid);
export {
    createOrderRepository,
    getOrderByIdRepository
}