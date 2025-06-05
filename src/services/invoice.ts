import { create } from "domain";
import { prisma } from "../configs/prismaClient";
import { invoiceSchema } from "../validation/types";

export async function postInvoice(data: invoiceSchema) {
  const invoice = await prisma.invoice.create({
    data: {
      noInvoice: data.noInvoice,
      date: data.date,
      company: data.company,
      address: data.address,
      phone: data.phoneNumber,
      item: {
        create: data.item.map((i) => ({
          product: i.product,
          price: Number(i.price),
          quantity: Number(i.quantity),
          total: Number(i.total),
        })),
      },
      subTotal: Number(data.subTotal),
      discount: Number(data.discount),
      total: Number(data.total),
      pdfUrl: data.publicUrlPdf,
      profileId: Number(data.profileId),
    },
  });
  return invoice;
}

export async function getAllInvoice(userId: string, next: number) {
  const invoice = await prisma.invoice.findMany({
    take: 10,
    skip: 1,
    cursor: {
      id: next,
    },
  });

  return invoice;
}

export async function getInvoice(noInvoice: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { noInvoice },
  });
  return invoice;
}
