import { Router } from "express";
import { invoiceContoller } from "../controllers/invoice";
import { authentication } from "../middlewares/auth";
import { supaUploads } from "../middlewares/supabaseUpload";


const router = Router()

router.post('/invoice', authentication, supaUploads('invoice'), invoiceContoller)

export default router