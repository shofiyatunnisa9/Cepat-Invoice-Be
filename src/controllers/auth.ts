import { Request, Response, NextFunction } from "express";
import { authSchema } from "../utils/validation/auth";
import { loginService, registerService } from "../services/auth";

export async function loginController(req: Request, res: Response, next: NextFunction){
  try{
    await authSchema.validateAsync(req.body)
    
    const token = await loginService(req.body)

    res.status(200).json({message:"access accepted", token})

  }catch(error: any){
    next(error)
  }
}

export async function registerController(req: Request, res: Response, next: NextFunction){
  try{
    await authSchema.validateAsync(req.body);

    const user = await registerService(req.body)

    res.status(200).json({message: "user registered"})
  }catch(error: any) {
    next(error)
  }
}