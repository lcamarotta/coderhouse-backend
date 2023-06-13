import { addOneRepository, deleteOneByIdRepository, getAllRepository, getByIdRepository, updateOneByIdRepository } from "../repository/products.repository.js";
import { logger } from "../utils/logger.js";
import CustomError from "./errors/CustomError.js";
import EErrors from "./errors/enums.js";

const getAllService = async(query, options) => await getAllRepository(query, options);

const getByIdService = async(pid) => await getByIdRepository(pid);

const addOneService = async(product, user) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw CustomError.createError(EErrors.INVALID_PARAMETER, 'title, category, price, stock, description, thumbnail, code -> these fields are required');
	}
    logger.debug('AddOneProductService, user:', user)
    switch (user.role) {
        case 'admin':
            product.owner = 'admin';
            break;
        case 'premium':
            product.owner = user.email;
            break;
        default:
            throw CustomError.createError(EErrors.BAD_REQUEST, 'User must be premium or admin');
    }
    logger.debug(`addOneProductService: product: `, product)
    return await addOneRepository(product);
};

const updateOneByIdService = async(pid, product, user) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw CustomError.createError(EErrors.INVALID_PARAMETER, 'title, category, price, stock, description, thumbnail, code -> these fields are required');
	}

    if(user.role == 'admin') return await updateOneByIdRepository(pid, product);
    if(user.role == 'premium'){
        const storedProduct = await getByIdService(pid);
        if(storedProduct.length == 0) throw CustomError.createError(EErrors.BAD_REQUEST, 'Product does not exist');
        if(storedProduct[0].owner == undefined) throw CustomError.createError(EErrors.BAD_REQUEST, 'You must be the owner of the product to be able to modify it.');

        if(storedProduct[0].owner == user.email){
            return await updateOneByIdRepository(pid, product);
        }else throw CustomError.createError(EErrors.BAD_REQUEST, 'You must be the owner of the product to be able to modify it');
    }

    throw CustomError.createError(EErrors.USER_MUST_BE_ADMIN, 'Must be admin or owner')
};

const deleteOneByIdService = async(id, user) => {

    if(user.role == 'admin') return await deleteOneByIdRepository(id);
    if(user.role == 'premium'){
        const storedProduct = await getByIdService(id);
        if(storedProduct.length == 0) throw CustomError.createError(EErrors.BAD_REQUEST, 'Product does not exist');
        if(storedProduct[0].owner == undefined) return await deleteOneByIdRepository(id);

        if(storedProduct[0].owner == user.email){
            return await deleteOneByIdRepository(id);
        }else throw CustomError.createError(EErrors.BAD_REQUEST, 'You must be the owner of the product to be able to delete it')
    }

    throw CustomError.createError(EErrors.USER_MUST_BE_ADMIN, 'Must be admin or owner')
};

export {
    getAllService,
    getByIdService,
    addOneService,
    updateOneByIdService,
    deleteOneByIdService
}