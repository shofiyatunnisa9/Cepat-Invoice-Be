import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";

const router = Router()

router.post("/login", loginController)
router.post("/register", registerController)
router.get("/", ()=>{console.log("test")})

export default router