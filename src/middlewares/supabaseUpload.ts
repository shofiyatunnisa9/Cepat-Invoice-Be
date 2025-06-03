import { NextFunction, Request, Response } from "express"
import { supabase } from "../configs/supabaseClient"
import path from "path"
const multer = require('multer')

// Konfigurasi Supabase

// Gunakan memoryStorage agar file disimpan di RAM
const upload = multer({ storage: multer.memoryStorage() })

// Middleware untuk upload file ke Supabase
export const supaUploads = (fileName:string) => [
  upload.single(fileName), // field name di form harus "file"
  async (req:Request, res:Response, next:NextFunction) => {
    try {
      const file = req.file
      const buffer: Buffer = req.file!.buffer
      if (!file) return res.status(400).json({ message: 'No file uploaded' })
      const ext = path.extname(req.file!.originalname).toLocaleLowerCase()
      const fileName = `${Date.now()}_${file.originalname}`
      let filePath = ""

    if([".jpg", ".jpeg", ".png"].includes(ext)){
      filePath = `uploads/image/${fileName}`

    } else if(ext == ".pdf"){
      filePath = `uploads/pdf/${fileName}`
    }

     const {error} = await supabase.storage.from('cepatinvoice').upload(
      filePath, buffer, {contentType: req.file!.mimetype});
      
      if(error){
      res.status(500).json({ message: error.message});
      return 
      }

    const { data }= supabase.storage.from(`cepatinvoice`).getPublicUrl(filePath);

    (req as any).publicurl = data.publicUrl;
    (req as any).filepath = filePath
    next()
    } catch (err) {
      next(err)
    }
  }
]

