import { Router } from 'express';
import { getCurrentUser, failLogin, failRegister, logout, loginByGithub, loginByGithubCallback, registerNewUser, loginByEmail } from "../../controllers/sessions.controller.js";

const router = Router();

router.get('/current', getCurrentUser);
router.get('/logout', logout);
router.get('/faillogin', failLogin);
router.get('/failregister', failRegister);

router.get('/github', loginByGithub);
router.get('/githubcallback', loginByGithubCallback);

router.post('/login', loginByEmail);
router.post('/register', registerNewUser);

export default router;