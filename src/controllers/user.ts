import { Request, Response, NextFunction } from "express";
import { inputProfile, postProfile } from "../services/user";

export async function postProfileController(req: Request, res: Response, next: NextFunction){
  try{
    const publicurl = (req as any).publicUrl
    const payload =  (req as any).payload

    const profile = await postProfile(publicurl, payload.id, req.body)

    res.status(200).json(profile)
  }catch(error){
    next(error)
  }
}