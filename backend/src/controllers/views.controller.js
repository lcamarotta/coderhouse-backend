import { getByIdService as cart_getByIdService} from "../services/carts.services.js";
import { getAllService as product_getAllService } from "../services/products.services.js";

const productsPage = async(req, res) => {
	const { page = 1, limit = 10, sort, query} = req.query;
	const user = req.session.user
	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await product_getAllService(query, options);
		const payload = {
			user,
			...result
		}
		res.render('products', payload);
        } catch (error) {
            res.status(error.httpStatusCode || 500).send({ error: error.message });
        }
};

const registerPage = (req, res) => {
	res.render('register');
};

const loginPage = (req, res) => {
	res.render('login');
};

const cartPage = async(req, res) => {
	const { cid } = req.params;

	try {
		const result = await cart_getByIdService(cid);
		const productsArray = [];
		result.products.forEach(element => {
			const product = {
				quantity: element.quantity,
				...element.product._doc
			}
			productsArray.push(product);
		});
		res.render('cart', { productsArray });
        } catch (error) {
            res.status(error.httpStatusCode || 500).send({ error: error.message });
        }
};

export {
    productsPage,
    registerPage,
    loginPage,
    cartPage
}