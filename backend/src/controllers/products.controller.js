import { getAllService, getByIdService, addOneService, updateOneByIdService, deleteOneByIdService } from "../services/products.services.js";

const getAll = async(req, res, next) => {
	const { page = 1, limit = 10, sort, query} = req.query;
	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
    }
	try {
		const result = await getAllService(query, options);
		res.send({ status: 'success', ...result });
    } catch (error) {
        next(error);
    }
};

const getById = async(req, res, next) => {
    const pid = req.params.pid;
	try {
		const result = await getByIdService(pid);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        next(error);
    }
};

const addOne = async(req, res, next) => {
    const product = req.body;
    const user = req.session.user;
    req.logger.debug(`Add Product endpoint, user:`, user)
	try {
		const result = await addOneService(product, user);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        next(error);
    }
};

const updateOneById = async(req, res, next) => {
    const pid = req.params.pid;
	const product = req.body;
    const user = req.session.user;
	try {
		const result = await updateOneByIdService(pid, product, user);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        next(error);
    }
};

const deleteOneById = async(req, res, next) => {
    const id = req.params.pid;
    const user = req.session.user;
	try {
		const result = await deleteOneByIdService(id, user);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        next(error);
    }
};


export {
    getAll,
    getById,
    addOne,
    updateOneById,
    deleteOneById
}