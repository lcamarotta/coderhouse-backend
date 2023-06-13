import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { isProductInCartService, getByIdService, updateService, updateManyService, deleteAllService, deleteByIdService, getPurchaseByEmailService, purchaseService } from "../services/carts.services.js";

const getById = async(req, res, next) => {
	const { cid } = req.params;
	try {
		const result = await getByIdService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
    }
};

const addOneProduct = async(req, res, next) => {
    const { cid, pid, quantity } = req.params;
    const user = req.session.user;
	try {
		const result = await updateService(cid, pid, quantity, user);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
    }
};

const addOrUpdateManyProducts = async(req, res, next) => {
    const { cid } = req.params;
	const productsToUpdate = req.body;
    const user = req.session.user;
	try {
        const result = await updateManyService(cid, productsToUpdate, user);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
    }
};

const updateOneProduct = async(req, res, next) => {
	const { cid, pid } = req.params;
	const quantity = req.body;
	try {
		if(await isProductInCartService(cid, pid) == -1) throw CustomError.createError(EErrors.BAD_REQUEST, 'Product is not in cart');
		const result = await updateService(cid, pid, quantity.quantity);
		res.send(
            {
                status: 'Success',
                payload: result
            }
        );
    } catch (error) {
        next(error);
    }
};

const removeAllProducts = async(req, res, next) => {
	const { cid } = req.params;
	try {
		const result = await deleteAllService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
    }
};

const removeOneProduct = async(req, res, next) => {
    const { cid, pid } = req.params;
	try {
		const result = await deleteByIdService(cid, pid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
    }
};

const purchase = async(req, res, next) => {
	const { cid } = req.params;
	try {
		const result = await purchaseService(cid, req.session.user);
        if(result == -1){
            res.send({ status: 'no stock', payload: -1 });
            return
        }

		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
    }
};

const getPurchaseByEmail = async(req, res, next) => {
	const { email } = req.params;
	try {
		const result = await getPurchaseByEmailService(email);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        next(error);
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