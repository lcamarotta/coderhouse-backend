import { Router } from "express";
import { test } from "../../controllers/logger.controller.js";
import { auth } from "../../controllers/users.controller.js";

const router = Router();

router.get('/', auth('public'), test);

export default router;