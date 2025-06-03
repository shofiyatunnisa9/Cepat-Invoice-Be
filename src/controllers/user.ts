import { Request, Response, NextFunction } from "express";
import { inputProfile, postProfile } from "../services/user";
import { supabase } from "../configs/supabaseClient";

export async function postProfileController(req: Request, res: Response, next: NextFunction){
  const publicurl= (req as any).publicurl
  const filepath = (req as any).filepath
  const payload =  (req as any).payload
  
  try{
    const profile = await postProfile(publicurl, payload.id, req.body)
    

    res.status(200).json({profile})
  }catch(error){
    await supabase.storage.from('cepatinvoice').remove([filepath])
    
    next(error)
  }
}