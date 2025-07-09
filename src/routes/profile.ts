import { Router } from "express";
import { authentication } from "../middlewares/auth";
import {
  getProfileController,
  // patchProfileController,
  postProfileController,
} from "../controllers/profile";
import { uploadField } from "../middlewares/supabaseUpload";

const router = Router();

router.get("/profile", authentication, getProfileController);

router.post(
  "/profile",
  authentication,
  uploadField(["logos"]),
  postProfileController
);

// router.patch(
//   "/profile",
//   authentication,
//   uploadField(["logos"]),
//   patchProfileController
// );

export default router;
