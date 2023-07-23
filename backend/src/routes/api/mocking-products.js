import { Router } from "express";
import { getMockProducts } from "../../controllers/mocking-products.controller.js";
import { auth } from "../../controllers/users.controller.js";

const router = Router();

router.get('/', auth('public'), getMockProducts);

export default router;