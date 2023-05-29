import CustomError from "../services/errors/CustomError.js";
import { getMockProductsService } from "../services/mocking-products-services.js"

const getMockProducts = async(req, res) => {
    try {
        const quantity = 100
        const result = getMockProductsService(quantity);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        throw CustomError.createError(EErrors.SERVER_ERROR);
    }
};

export {
    getMockProducts
}