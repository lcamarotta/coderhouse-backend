import { Router } from 'express';
import { getAll, getById, addOne, updateOneById, deleteOneById } from "../../controllers/products.controller.js";
import { auth } from "../../services/sessions.services.js";

const router = Router();

router.get('/', auth('public'), getAll);
router.get('/:pid', auth('public'), getById);

router.post('/', auth('admin'), addOne);

router.put('/:pid', auth('admin'), updateOneById);

router.delete('/:pid', auth('admin'), deleteOneById);

export default router;