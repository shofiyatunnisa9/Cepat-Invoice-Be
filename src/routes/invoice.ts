import { Router } from "express";
import {
  getAllInvoiceController,
  getInvoiceController,
  postInvoiceController,
} from "../controllers/invoice";
import { authentication } from "../middlewares/auth";
import { supaUploads } from "../middlewares/supabaseUpload";

const router = Router();

router.get("/invoice/:noInvoice", authentication, getInvoiceController);

router.get("/invoice", authentication, getAllInvoiceController);

router.post(
  "/invoice",
  authentication,
  supaUploads("invoice"),
  postInvoiceController
);

export default router;
