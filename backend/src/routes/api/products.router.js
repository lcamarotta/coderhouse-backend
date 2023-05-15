import { Router } from 'express';
import { getAll, getById, addOne, updateOneById, deleteOneById } from "../../controllers/products.controller.js";

const router = Router();

const privateAccess = (req, res, next) => {
    if (!req.session.user) {
        console.log('Must be authenticated');
        return res.status(401).send('Must be authenticated');
    }
    next();
};

const adminAccess = (req, res, next) => {
    if (req.session.user.role != 'admin') {
        console.log('Must be admin');
        return res.status(401).send({ error: 'UNAUTHORIZED' });
    }
    next();
};

router.get('/', getAll);
router.get('/:pid', getById);

router.post('/', privateAccess, adminAccess, addOne);

router.put('/:pid', privateAccess, adminAccess, updateOneById);

router.delete('/:pid', privateAccess, adminAccess, deleteOneById);

export default router;