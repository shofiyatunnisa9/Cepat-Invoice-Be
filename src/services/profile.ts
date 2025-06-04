import { prisma } from "../configs/prismaClient";
import { profileSchema } from "../validation/types";



export async function postProfile(data:profileSchema) {
  const profile = await prisma.profile.create({
    data:{
      company: data.company,
      address: data.address,
      phone: data.phoneNumber,
      image: data.publicUrlImage,
      userId: data.userId,
      // user:{
      //   connect: {id: userId}
      // }
    }
  })
  return profile
}