import { Router } from "express";
import { getById, addOneProduct, addOrUpdateManyProducts, updateOneProduct, removeAllProducts, removeOneProduct} from "../../controllers/carts.controller.js";

const router = Router();

router.get('/:cid', getById);

router.post('/:cid/product/:pid', addOneProduct);

router.put('/:cid', addOrUpdateManyProducts);
router.put('/:cid/products/:pid', updateOneProduct);

router.delete('/:cid', removeAllProducts);
router.delete('/:cid/products/:pid', removeOneProduct);

export default router;