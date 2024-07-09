import { Router } from "express";
import AuthController from "../controllers/auth.js";

const router = Router();

router.get("/login", AuthController.login);
router.get("/logauth", AuthController.logout);

export default router;
