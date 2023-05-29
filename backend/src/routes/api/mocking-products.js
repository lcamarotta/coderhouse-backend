import { Router } from "express";
import { auth } from "../../services/sessions.services.js";
import { getMockProducts } from "../../controllers/mocking-products.controller.js";

const router = Router();

router.get('/', auth('public'), getMockProducts);

export default router;