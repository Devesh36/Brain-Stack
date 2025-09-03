import { Router } from "express";
import { signup, login, logout, verifyAuth } from "../controllers/auth.controllers";
import auth from '../middleware/authMiddleware';

const router = Router();

console.log('Setting up auth routes...');

router.post("/signup", signup);

// use controller directly for login as well
router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", auth, verifyAuth);

console.log('Auth routes configured');

export default router;