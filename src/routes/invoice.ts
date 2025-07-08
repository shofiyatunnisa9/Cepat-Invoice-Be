import { Router } from "express";
import {
  // getAllInvoiceController,
  // getInvoiceController,
  postInvoiceController,
} from "../controllers/invoice";
import { authentication } from "../middlewares/auth";
import { uploadField } from "../middlewares/supabaseUpload";

const router = Router();

// router.get("/invoice/:noInvoice", authentication, getInvoiceController);

// router.get("/invoices", authentication, getAllInvoiceController);

router.post(
  "/invoice",
  authentication,
  uploadField(["invoices"]),
  postInvoiceController
);

export default router;
