import { Router } from "express";
import { getById, addOneProduct, addOrUpdateManyProducts, updateOneProduct, removeAllProducts, removeOneProduct, getPurchaseByEmail, purchase} from "../../controllers/carts.controller.js";
import { auth } from "../../services/users.services.js";

const router = Router();

router.get('/:cid', auth('any'), getById);
router.get('/:cid/purchase', auth('any'), purchase);
router.get('/purchase/:email', auth('any'), getPurchaseByEmail);

router.post('/:cid/product/:pid/:quantity', auth('any'), addOneProduct);

router.put('/:cid', auth('any'), addOrUpdateManyProducts);
router.put('/:cid/products/:pid', auth('any'), updateOneProduct);

router.delete('/:cid', auth('any'), removeAllProducts);
router.delete('/:cid/products/:pid', auth('any'), removeOneProduct);

export default router;