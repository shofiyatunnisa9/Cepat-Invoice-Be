import { Request, Response, NextFunction } from "express";
import { supabase } from "../configs/supabaseClient";
import path from "path";

export async function uploadSupabase (req: Request, res: Response, next: NextFunction){

  if(req.file){
    const buffer: Buffer = req.file.buffer
    const ext = path.extname(req.file.originalname).toLocaleLowerCase()
    const fileName = `${Date.now()}${ext}`
    let filePath = ""

    if([".jpg", ".jpeg", ".png"].includes(ext)){
      filePath = `uploads/image/${fileName}`

    } else if(ext == ".pdf"){
      filePath = `uploads/pdf/${fileName}`
    }

    const {error} = await supabase.storage.from('cepatinvoice').upload(
      filePath, buffer, {contentType: req.file.mimetype});
      
    if(error){
      res.status(500).json({ error, ext: ext});
      return 
    }
    const { data }= supabase.storage.from(`cepatinvoice`).getPublicUrl(filePath);

    (req as any).publicurl = data.publicUrl
  }

  next()
}