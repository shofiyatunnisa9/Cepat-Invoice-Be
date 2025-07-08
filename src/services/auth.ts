import { prisma } from "../configs/prismaClient";
import { compare, hash } from "bcrypt";
import { signToken, TokenPayload, verifyToken } from "../utils/jwt";
import { Auth } from "../validation/types/Auth";

export async function loginService(data: Auth) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) throw new Error("Email is not registered");

  const isValid = await compare(data.password, user.password);
  if (!isValid) throw new Error("Wrong password");

  const payload: TokenPayload = { id: user.id, Role: user.role };

  const token = signToken(payload);

  return token;
}

export async function registerService(data: Auth) {
  const hashPassword = await hash(data.password, 10);

  const user = await prisma.user.create({
    data: { email: data.email, password: hashPassword },
  });
  const payload: TokenPayload = { id: user.id, Role: user.role };

  const token = signToken(payload);

  return { email: user.email, token };
}
