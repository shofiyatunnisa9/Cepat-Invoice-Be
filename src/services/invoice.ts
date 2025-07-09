import { prisma } from "../configs/prismaClient";
import { invoiceSchema } from "../validation/types/invoice";

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
      userId: data.userId,
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

export async function firstQueryInvoice(userId: string) {
  const invoice = await prisma.invoice.findMany({
    where: { userId },
    take: 11,
    orderBy: { id: "asc" },
  });

  return invoice;
}
export async function nextQueryInvoice(userId: string, cursor: number) {
  const invoice = await prisma.invoice.findMany({
    where: { userId },
    take: 11,
    cursor: {
      id: cursor,
    },
    skip: 1,
    orderBy: { id: "asc" },
  });

  return invoice;
}
export async function prevQueryInvoice(userId: string, cursor: number) {
  const invoice = await prisma.invoice.findMany({
    take: 10,
    cursor: { id: cursor },
    orderBy: { id: "desc" },
    where: {
      id: { lt: cursor },
      userId,
    },
  });

  return invoice;
}
export async function firstInvoice(userId: string, firstId: number) {
  const first = prisma.invoice.findFirst({
    where: {
      userId,
      id: { lt: firstId },
    },
  });
  return first;
}
