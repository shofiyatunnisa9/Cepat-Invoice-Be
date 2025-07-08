import { prisma } from "../configs/prismaClient";
import { editProfileSchema, profileSchema } from "../validation/types/profile";

export async function getProfile(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  if (!profile) throw new Error("Your profile is not registered yet");

  return profile;
}

export async function postProfile(data: profileSchema) {
  const profile = await prisma.profile.create({
    data: {
      company: data.company,
      address: data.address,
      phone: data.phoneNumber,
      image: data.publicUrlImage,
      userId: data.userId,
    },
  });
  return profile;
}

export async function patchProfile(data: editProfileSchema) {
  const editedProfile = await prisma.profile.update({
    where: { userId: data.userId },
    data: {
      company: data.company,
      address: data.address,
      phone: data.phoneNumber,
      image: data.publicUrlImage,
    },
  });
  return editedProfile;
}
