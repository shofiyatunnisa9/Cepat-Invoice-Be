import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/jwt";

export function authentication(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization;
  if(!authHeader) throw new Error ("Unauthentecated");

  const token = authHeader?.split(" ")[1];
  const decode = verifyToken(token);

  (req as any).payload = decode
  next()
}

export function authorization(req: Request, res: Response, next: NextFunction){

}