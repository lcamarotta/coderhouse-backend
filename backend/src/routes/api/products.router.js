import { Router } from 'express';
import { getAll, getById, addOne, updateOneById, deleteOneById } from "../../controllers/products.controller.js";
import { auth } from "../../controllers/users.controller.js";

const router = Router();

router.get('/', auth('public'), getAll);
router.get('/:pid', auth('public'), getById);

router.post('/', auth('any'), addOne);

router.put('/:pid', auth('any'), updateOneById);

router.delete('/:pid', auth('any'), deleteOneById);

export default router;