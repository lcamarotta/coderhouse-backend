import { Router } from 'express';
import { getAll, getById, addOne, updateOneById, deleteOneById } from "../../controllers/products.controller.js";

const router = Router();

router.get('/', getAll);
router.get('/:pid', getById);

router.post('/', addOne);

router.put('/:pid', updateOneById);

router.delete('/:pid', deleteOneById);

export default router;