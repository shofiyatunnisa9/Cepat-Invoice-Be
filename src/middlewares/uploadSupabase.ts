import { Request, Response, NextFunction } from "express";
import { supabase } from "../configs/supabaseClient";

export async function uploadSupabase (req: Request, res: Response, next: NextFunction){

  if(req.file){
    const buffer: Buffer = req.file.buffer
    const ext = req.file.originalname.split(".").pop()
    const fileName = `${Date.now()}.${ext}`
    const filePath = `uploads/${fileName}`

    const {error} = await supabase.storage.from('profileimg').upload(filePath, buffer, {
        contentType: req.file.mimetype
      });
    if(error){
      res.status(500).json({ error: 'Gagal upload ke Supabase' });
      return 
    }
    const { data }= supabase.storage.from(`profileimg`).getPublicUrl(filePath);

    (req as any).publicUrl = data.publicUrl
  }
  next()
}