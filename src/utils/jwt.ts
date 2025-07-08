import jwt from "jsonwebtoken";
import { Role } from "../validation/types/Auth";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface TokenPayload {
  id: string;
  Role: Role;
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
