import { prisma } from "../configs/prismaClient";

export interface inputProfile{
  company: string
  address: string
  phone: string
}

export async function postProfile(publicUrl: string, userId: string,data:inputProfile) {
  const profile = await prisma.profile.create({
    data:{
      company:data.company,
      address: data.address,
      phone: data.phone,
      image: publicUrl,
      user:{
        connect: {id: userId}
      }
    }
  })
  return profile
}