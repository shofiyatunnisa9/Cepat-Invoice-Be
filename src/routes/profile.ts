import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  getProfileController,
  patchProfileController,
  postProfileController,
} from "../controllers/profile";
import { supaUploads } from "../middlewares/supabaseUpload";
import { patchProfile } from "../services/profile";

const router = Router();

router.get("/profile", authentication, getProfileController);

router.post(
  "/profile",
  authentication,
  supaUploads("image"),
  postProfileController
);

router.patch(
  "/profile",
  authentication,
  supaUploads("image"),
  patchProfileController
);

export default router;
