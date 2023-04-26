import { PRODUCTDAO } from "../dao/index.js";
import { errorWithStatusCode as err } from "../utils.js";

const getAllService = async(query, options) => await PRODUCTDAO.get(query, options);

const getByIdService = async(pid) => await PRODUCTDAO.getById(pid);

const addOneService = async(product) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw new err('Incomplete Values', 400);
	}
    await PRODUCTDAO.save(product)
};

const updateOneByIdService = async(pid, product) => {
    const { title, category, price, stock, description, thumbnail, code } = product;
	if(!title || !category || !price || !stock || !description || !thumbnail || !code){
		throw new err('Incomplete Values', 400);
	}
    await PRODUCTDAO.update(pid, product)
};

const deleteOneByIdService = async(id) => await PRODUCTDAO.delete(id);


export {
    getAllService,
    getByIdService,
    addOneService,
    updateOneByIdService,
    deleteOneByIdService
}