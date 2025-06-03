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
  originalPrice: number
  discount: number
  discountedPrice: number
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
          price: i.price,
          quantity: i.qty,
          total: i.total
        }))
      },
      originalPrice: input.originalPrice,
      discount: input.discount,
      discountedPrice: input.discountedPrice,
      total: input.total,
      pdfUrl: pdfPublicUrl,
      profileId: profileId

    }
  })
  return invoice
}