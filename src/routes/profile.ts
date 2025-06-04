import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { postProfileController } from "../controllers/profile";
import { supaUploads } from "../middlewares/supabaseUpload";

const router = Router()

router.post("/profile", authentication, supaUploads('image'), postProfileController)

export default router