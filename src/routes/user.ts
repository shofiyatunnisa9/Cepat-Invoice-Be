import { Router } from "express";
import { authentication } from "../middlewares/auth";
import { Response, Request } from "express";

import { upload } from "../middlewares/multer";
import { uploadSupabase } from "../middlewares/uploadSupabase";
import { postProfileController } from "../controllers/user";

const router = Router()

router.post("/profile", authentication, upload.single("image"), uploadSupabase, postProfileController)

export default router