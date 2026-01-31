import { Router } from "express";
import { registerController, meController, loginController, updateProfileController } from "../src/controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", authMiddleware, meController)
router.put("/me", authMiddleware, updateProfileController)


export default router; 
