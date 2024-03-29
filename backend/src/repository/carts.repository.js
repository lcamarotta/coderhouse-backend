import { CARTDAO, TICKETDAO } from "../dao/index.js";

const createCartRepository = async() => await CARTDAO.create();
const deleteCartRepository = async(cid) => await CARTDAO.delete(cid);
const isProductInCartRepository = async(cid, pid) => await CARTDAO.isProductInCart(cid, pid);
const getByIdRepository = async(cid) => await CARTDAO.getById(cid);
const updateRepository = async(cid, pid, quantity) => await CARTDAO.update(cid, pid, quantity);
const deleteAllRepository = async(cid) => await CARTDAO.deleteAll(cid);
const deleteByIdRepository = async(cid, pid) => await CARTDAO.deleteById(cid, pid);

const createPurchaseRepository = async(email, products) => await TICKETDAO.createPurchase(email, products);
const getPurchaseByEmailRepository = async(email) => await TICKETDAO.getPurchaseByEmail(email);

export {
    createCartRepository,
    deleteCartRepository,
    isProductInCartRepository,
    getByIdRepository,
    updateRepository,
    deleteAllRepository,
    deleteByIdRepository,
    createPurchaseRepository,
    getPurchaseByEmailRepository
}