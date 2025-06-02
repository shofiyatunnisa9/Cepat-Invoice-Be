import { Request, Response, NextFunction, Router } from "express";
import { upload } from "../middlewares/multer";
import { uploadSupabase } from "../middlewares/uploadSupabase";
import { authentication } from "../middlewares/auth";
import { invoiceContoller } from "../controllers/invoice";


const router = Router()

router.post('/invoice', authentication, upload.single("invoice"), uploadSupabase, invoiceContoller)

export default router