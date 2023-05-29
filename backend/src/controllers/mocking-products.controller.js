import { errorWithStatusCode as err } from "../utils.js";
import { getMockProductsService } from "../services/mocking-products-services.js"

const getMockProducts = async(req, res) => {
    try {
        const quantity = 100
        const result = getMockProductsService(quantity);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

export {
    getMockProducts
}