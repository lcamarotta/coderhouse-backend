import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { getMockProductsService } from "../services/mocking-products-services.js"

const getMockProducts = async(req, res, next) => {
    try {
        const quantity = 100
        const result = getMockProductsService(quantity);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        next(error);
    }
};

export {
    getMockProducts
}