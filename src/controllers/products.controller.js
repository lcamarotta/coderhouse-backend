import { getAllService, getByIdService, addOneService, updateOneByIdService, deleteOneByIdService } from "../services/products.services.js";

const getAll = async(req, res) => {
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
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const getById = async(req, res) => {
    const pid = req.params.pid;
	try {
		const result = await getByIdService(pid);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const addOne = async(req, res) => {
    const product = req.body;
	try {
		const result = await addOneService(product);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const updateOneById = async(req, res) => {
    const pid = req.params.pid;
	const product = req.body;
	try {
		const result = await updateOneByIdService(pid, product);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const deleteOneById = async(req, res) => {
    const id = req.params.pid;
	try {
		const result = await deleteOneByIdService(id);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};


export {
    getAll,
    getById,
    addOne,
    updateOneById,
    deleteOneById
}