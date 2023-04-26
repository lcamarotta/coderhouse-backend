import { CARTDAO } from "../dao/index.js";

const isProductInCartService = async(cid, pid) => await CARTDAO.isProductInCart(cid, pid);

const getByIdService = async(cid) => await CARTDAO.getById(cid);

const updateService = async(cid, pid, quantity) => await CARTDAO.update(cid, pid, quantity);

const updateManyService = async(cid, array) => {
    const result = [];
    for (const product of array) {
        result.push(await updateService(cid, product.productId, product.quantity));
    }
    return result;
};

const deleteAllService = async(cid) => await CARTDAO.deleteAll(cid);

const deleteByIdService = async(cid, pid) => await CARTDAO.deleteById(cid, pid);

export {
    isProductInCartService,
    getByIdService,
    updateService,
    updateManyService,
    deleteAllService,
    deleteByIdService
}