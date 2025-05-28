import { Request, Response } from "express";
import { authSchema } from "../utils/validation/auth";
import { loginService, registerService } from "../services/auth";

export async function loginController(req: Request, res: Response){
  try{
    const {error} = authSchema.validate(req.body)
    if(error) throw new Error (error.message)
    
    const token = await loginService(req.body)

    res.status(200).json({message:"access accepted", token})

  }catch(e){
    if(e instanceof Error){
      res.status(400).json({message: e.message, name: e.name})
    }
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function registerController(req: Request, res: Response){
  try{

    const {error} = authSchema.validate(req.body);
    if(error) throw new Error(error.message)

    const user = await registerService(req.body)

    res.status(200).json({message: "user registered"})
  }catch(e: any) {
    if(e.code == "P2002"){
      res.status(409).json({message: "This email is already registered."})
    } else if (e instanceof Error){
      res.status(400).json({message: e.message})
    }
    res.status(500).json({code: e.code})
  }
}