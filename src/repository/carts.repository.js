import { CARTDAO } from "../dao/index.js";

const isProductInCartRepository = async(cid, pid) => await CARTDAO.isProductInCart(cid, pid);
const getByIdRepository = async(cid) => await CARTDAO.getById(cid);
const updateRepository = async(cid, pid, quantity) => await CARTDAO.update(cid, pid, quantity);
const deleteAllRepository = async(cid) => await CARTDAO.deleteAll(cid);
const deleteByIdRepository = async(cid, pid) => await CARTDAO.deleteById(cid, pid);

export {
    isProductInCartRepository,
    getByIdRepository,
    updateRepository,
    deleteAllRepository,
    deleteByIdRepository
}