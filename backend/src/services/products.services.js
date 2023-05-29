import { addOneRepository, deleteOneByIdRepository, getAllRepository, getByIdRepository, updateOneByIdRepository } from "../repository/products.repository.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";

const getAllService = async(query, options) => await getAllRepository(query, options);

const getByIdService = async(pid) => await getByIdRepository(pid);

const addOneService = async(product) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw CustomError.createError(EErrors.INVALID_PARAMETER);
	}
    await addOneRepository(product);
};

const updateOneByIdService = async(pid, product) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw CustomError.createError(EErrors.INVALID_PARAMETER);
	}
    await updateOneByIdRepository(pid, product)
};

const deleteOneByIdService = async(id) => await deleteOneByIdRepository(id);


export {
    getAllService,
    getByIdService,
    addOneService,
    updateOneByIdService,
    deleteOneByIdService
}