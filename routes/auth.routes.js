import { Router } from "express";
import { login, refresh, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = Router();

// router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout);

export default router;
