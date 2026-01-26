import {Router} from "express";
import { registerContorller, meController, loginController } from "../src/controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router();

router.post("/register", registerContorller)
router.post("/login", loginController)
router.get("/me" , authMiddleware, meController)


export default router ; 
