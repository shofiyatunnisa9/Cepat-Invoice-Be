import { Request, Response, NextFunction } from "express";
import {
  firstInvoice,
  firstQueryInvoice,
  getInvoice,
  nextQueryInvoice,
  postInvoice,
  prevQueryInvoice,
} from "../services/invoice";
import { supabase } from "../configs/supabaseClient";
import { invoiceSchema } from "../validation/invoice";
import { getProfile } from "../services/profile";
import { error } from "console";
import { Invoice } from "../../generated/prisma";

export async function postInvoiceController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.publicUrlPdf = (req as any).invoicesUrl;

  const filepath = (req as any).filePath;
  const { id } = (req as any).AuthUser;

  const now = new Date();
  if (!req.body.noInvoice) {
    const unique = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    const date = now.toISOString().slice(0, 10).replace(/-/g, "");
    req.body.noInvoice = `INV-gen-${date}-${unique}`;
  }

  try {
    const profile = await getProfile(id);
    req.body.userId = profile.userId;

    await invoiceSchema.validateAsync(req.body);

    const invoice = await postInvoice(req.body);

    res.status(200).json(invoice);
  } catch (err) {
    await supabase.storage.from("cepatinvoice").remove([filepath]);
    next(err);
  }
}

export async function getInvoiceController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { noInvoice } = req.params;
  try {
    const invoice = await getInvoice(noInvoice);

    res.status(200).json(invoice);
  } catch (error) {}
  next(error);
}

export async function getAllInvoiceController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { direction, cursor } = req.query;
  const { id } = (req as any).AuthUser;
  let invoice: Invoice[] = [];
  let hasNext = false;
  let hasPrev = false;
  let nextCursor;
  let prevCursor;

  try {
    const profileId = (await getProfile(id)).userId;

    if (direction === "next") {
      invoice = await nextQueryInvoice(profileId, Number(cursor));
      hasPrev = true;
      if (invoice.length > 10) {
        invoice.pop();
        hasNext = true;
      }
    } else if (direction === "prev") {
      invoice = await prevQueryInvoice(profileId, Number(cursor));
      invoice.reverse();
      const prevAble = await firstInvoice(profileId, invoice[0].id);
      hasNext = true;

      if (prevAble) {
        hasPrev = true;
      }
    } else {
      invoice = await firstQueryInvoice(profileId);
      if (invoice.length > 10) {
        invoice.pop();
        hasNext = true;
      }
    }

    if (hasNext && invoice.length > 0) {
      nextCursor = {
        direction: "next",
        cursor: invoice[invoice.length - 1].id,
      };
    }
    if (hasPrev && invoice.length > 0) {
      prevCursor = {
        direction: "prev",
        cursor: invoice[0].id,
      };
    }

    res.status(200).json({ invoice, nextCursor, prevCursor });
  } catch (error) {
    next(error);
  }
}
