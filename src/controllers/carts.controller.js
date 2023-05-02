import { errorWithStatusCode as err } from "../utils.js";
import { isProductInCartService, getByIdService, updateService, updateManyService, deleteAllService, deleteByIdService } from "../services/carts.services.js";

const getById = async(req, res) => {
	const { cid } = req.params;
	try {
		const result = await getByIdService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const addOneProduct = async(req, res) => {
    const { cid, pid } = req.params;
	try {
        console.log('hola')
		const result = await updateService(cid, pid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const addOrUpdateManyProducts = async(req, res) => {
    const { cid } = req.params;
	const productsToUpdate = req.body;
	try {
        const result = await updateManyService(cid, productsToUpdate);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const updateOneProduct = async(req, res) => {
	const { cid, pid } = req.params;
	const quantity = req.body;
	try {
		if(await isProductInCartService(cid, pid) == -1) throw new err('Can not update product quantity because it has not been added to cart', 400);
		const result = await updateService(cid, pid, quantity.quantity);
		res.send(
            {
                status: 'Success',
                payload: result
            }
        );
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const removeAllProducts = async(req, res) => {
	const { cid } = req.params;
	try {
		const result = await deleteAllService(cid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const removeOneProduct = async(req, res) => {
    const { cid, pid } = req.params;
	try {
		const result = await deleteByIdService(cid, pid);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

export {
    getById,
    addOneProduct,
    addOrUpdateManyProducts,
    updateOneProduct,
    removeAllProducts,
    removeOneProduct
}