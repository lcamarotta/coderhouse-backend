import { Router } from "express";
import { getByEmail, checkout } from "../../controllers/orders.controller.js";
import { auth } from "../../services/sessions.services.js";

const router = Router();

router.get('/:email', auth('any'), getByEmail);

router.get('/:cartId/checkout', auth('any'), checkout);

export default router;