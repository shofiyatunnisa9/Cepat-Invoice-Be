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
  const publicUrlPdf = (req as any).invoicesUrl;

  const filepath = (req as any).filePath;
  const { id } = (req as any).AuthUser;

  try {
    const items = JSON.parse(req.body.item);

    const payload = {
      noInvoice: req.body.noInvoice,
      date: new Date(`${req.body.date}T00:00:00.000Z`),
      company: req.body.company,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      item: items,
      subTotal: req.body.subTotal,
      discount: req.body.discount,
      total: req.body.total,
      publicUrlPdf,
      userId: id,
    };
    await invoiceSchema.validateAsync(payload);

    const invoice = await postInvoice(payload);

    res.status(200).json(invoice);
  } catch (err) {
    await supabase.storage.from("invoices").remove([filepath]);
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
