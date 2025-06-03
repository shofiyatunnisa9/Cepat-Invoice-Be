import { create } from "domain";
import { prisma } from "../configs/prismaClient";

interface Item {
  product: string
  price: number
  qty: number
  total: number
}

interface invoice{
  noInvoice: string
  date: string
  company: string
  address: string
  phone: string
  item: Item[]
  subTotal: number
  discount: number
  total: number
}

export async function getProfile(userId: string){

    const profile = await prisma.profile.findUnique({
      where: {Userid: userId}
    })
    if (!profile) throw new Error ("Your profile is not registered yet")

    return profile.id
}

export async function postInvoice(pdfPublicUrl:string, profileId:number, input:invoice) {
  const invoice = await prisma.invoice.create({
    data: {
      noInvoice: input.noInvoice,
      date:input.date,
      company:input.company,
      address: input.address,
      phone: input.phone,
      item: {
        create: input.item.map( i => ({
          product:i.product,
          price: Number(i.price),
          quantity: Number(i.qty),
          total: Number(i.total)
        }))
      },
      subTotal: Number(input.subTotal),
      discount: Number(input.discount),
      total: Number(input.total),
      pdfUrl: pdfPublicUrl,
      profileId: profileId
    }
  })
  return invoice
}