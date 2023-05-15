import { Router } from "express";
import { getById, addOneProduct, addOrUpdateManyProducts, updateOneProduct, removeAllProducts, removeOneProduct} from "../../controllers/carts.controller.js";

const router = Router();

const privateAccess = (req, res, next) => {
    if (!req.session.user) {
        console.log('Must be authenticated');
        return res.status(401).send('Must be authenticated');
    }
    next();
};

router.get('/:cid', privateAccess, getById);

router.post('/:cid/product/:pid/:quantity', privateAccess, addOneProduct);

router.put('/:cid', privateAccess, addOrUpdateManyProducts);
router.put('/:cid/products/:pid', privateAccess, updateOneProduct);

router.delete('/:cid', privateAccess, removeAllProducts);
router.delete('/:cid/products/:pid', privateAccess, removeOneProduct);

export default router;