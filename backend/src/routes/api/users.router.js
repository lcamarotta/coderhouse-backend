import passport from "passport";
import { Router } from 'express';
import { getCurrentUser, logout, registerNewUser, loginByEmail, passwordResetRequest, passwordResetValidate, modifyUserRole, deleteOldUsers, githubCallback, auth, getAllUsers, deleteUser } from "../../controllers/users.controller.js";

const router = Router();

router.get('/', auth('admin'), getAllUsers)
router.get('/premium/:uid', auth('any'), modifyUserRole);
router.get('/current', auth('public'), getCurrentUser);
router.get('/logout', auth('any'), logout);

router.get('/github', auth('public'), passport.authenticate('github', { scope: ['user: email'] }));
router.get('/githubcallback', auth('public'), passport.authenticate('github'),  githubCallback);

router.put('/reset-request', auth('notloggedin'), passwordResetRequest);
router.put('/reset-password/:token', auth('notloggedin'), passwordResetValidate);

router.post('/login', auth('public'), passport.authenticate('login'), loginByEmail);
router.post('/register', auth('public'), passport.authenticate('register'), registerNewUser);

router.delete('/', auth('admin'), deleteOldUsers);
router.delete('/:email', auth('admin'), deleteUser);

export default router;