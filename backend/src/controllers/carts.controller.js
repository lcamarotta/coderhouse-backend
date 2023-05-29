import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { isProductInCartService, getByIdService, updateService, updateManyService, deleteAllService, deleteByIdService, getPurchaseByEmailService, purchaseService } from "../services/carts.services.js";

const getById = async(req, res) => {
	const { cid } = req.params;
	try {
		const result = await getByIdService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const addOneProduct = async(req, res) => {
    const { cid, pid, quantity } = req.params;
	try {
		const result = await updateService(cid, pid, quantity);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const addOrUpdateManyProducts = async(req, res) => {
    const { cid } = req.params;
	const productsToUpdate = req.body;
	try {
        const result = await updateManyService(cid, productsToUpdate);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const updateOneProduct = async(req, res) => {
	const { cid, pid } = req.params;
	const quantity = req.body;
	try {
		if(await isProductInCartService(cid, pid) == -1) throw CustomError.createError(EErrors.BAD_REQUEST);
		const result = await updateService(cid, pid, quantity.quantity);
		res.send(
            {
                status: 'Success',
                payload: result
            }
        );
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const removeAllProducts = async(req, res) => {
	const { cid } = req.params;
	try {
		const result = await deleteAllService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const removeOneProduct = async(req, res) => {
    const { cid, pid } = req.params;
	try {
		const result = await deleteByIdService(cid, pid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const purchase = async(req, res) => {
	const { cid } = req.params;
	try {
		const result = await purchaseService(cid, req.session.user);
        if(result == -1){
            res.send({ status: 'no stock', payload: -1 });
            return
        }

		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

const getPurchaseByEmail = async(req, res) => {
	const { email } = req.params;
	try {
		const result = await getPurchaseByEmailService(email);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

export {
    getById,
    addOneProduct,
    addOrUpdateManyProducts,
    updateOneProduct,
    removeAllProducts,
    removeOneProduct,
    purchase,
    getPurchaseByEmail
}