import { Request, Response, NextFunction } from "express";
import { postProfile } from "../services/profile";
import { supabase } from "../configs/supabaseClient";
import { profileSchema } from "../validation/profile";

export async function postProfileController(req: Request, res: Response, next: NextFunction){
  req.body.publicUrlImage = (req as any).publicUrl
  req.body.userId = (req as any).payload.id
  const filepath = (req as any).filePath
  
  try{
    await profileSchema.validateAsync(req.body)

    const profile = await postProfile(req.body)

    res.status(200).json(profile)
  }catch(error){
    await supabase.storage.from('cepatinvoice').remove([filepath])
    next(error)
  }
}