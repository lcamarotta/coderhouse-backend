import { isProductInCartRepository, getByIdRepository, updateRepository, deleteAllRepository, deleteByIdRepository } from "../repository/carts.repository.js";

const isProductInCartService = async(cid, pid) => await isProductInCartRepository(cid, pid);

const getByIdService = async(cid) => await getByIdRepository(cid);

const updateService = async(cid, pid, quantity) => await updateRepository(cid, pid, quantity);

const updateManyService = async(cid, array) => {
    const result = [];
    for (const product of array) {
        result.push(await updateRepository(cid, product.productId, product.quantity));
    }
    return result;
};

const deleteAllService = async(cid) => await deleteAllRepository(cid);

const deleteByIdService = async(cid, pid) => await deleteByIdRepository(cid, pid);

export {
    isProductInCartService,
    getByIdService,
    updateService,
    updateManyService,
    deleteAllService,
    deleteByIdService
}