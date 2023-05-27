import { Router } from "express";
import { getById, addOneProduct, addOrUpdateManyProducts, updateOneProduct, removeAllProducts, removeOneProduct} from "../../controllers/carts.controller.js";
import { auth } from "../../services/sessions.services.js";

const router = Router();

router.get('/:cid', auth('any'), getById);

router.post('/:cid/product/:pid/:quantity', auth('any'), addOneProduct);

router.put('/:cid', auth('any'), addOrUpdateManyProducts);
router.put('/:cid/products/:pid', auth('any'), updateOneProduct);

router.delete('/:cid', auth('any'), removeAllProducts);
router.delete('/:cid/products/:pid', auth('any'), removeOneProduct);

export default router;