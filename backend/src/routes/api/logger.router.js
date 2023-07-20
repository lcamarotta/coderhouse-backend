import { Router } from "express";
import { test } from "../../controllers/logger.controller.js";
import { auth } from "../../services/users.services.js";

const router = Router();

router.get('/', auth('public'), test);

export default router;