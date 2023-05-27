import { errorWithStatusCode as err } from "../utils.js";
import { getByEmailService, checkoutService } from "../services/orders.services.js";

const getByEmail = async(req, res) => {
	const { email } = req.params;
	try {
		const result = await getByEmailService(email);
		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const checkout = async(req, res) => {
	const { cartId } = req.params;
	try {
		const result = await checkoutService(cartId, req.session.user);
        if(result == -1){
            res.send({ status: 'no stock', payload: -1 });
            return
        }

		res.send({ status: 'Success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

export {
    getByEmail,
    checkout
}