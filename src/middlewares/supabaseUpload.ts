import { NextFunction, Request, Response } from "express"
import { supabase } from "../configs/supabaseClient"
import path from "path"
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

export const supaUploads = (fileName:string) => [
  upload.single(fileName),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
      const file = req.file
      if (!file) return res.status(400).json({ message: 'No file uploaded' });
      
      const buffer: Buffer = file.buffer
      const ext = path.extname(req.file!.originalname).toLocaleLowerCase()
      const fileName = `${Date.now()}_${file.originalname}`
      let filePath = ""

      if([".jpg", ".jpeg", ".png"].includes(ext)){
        filePath = `uploads/image/${fileName}`
      } else if(ext == ".pdf"){
        filePath = `uploads/pdf/${fileName}`
      } else {
        throw new Error("Unsupported file format")
      }

      const {error} = await supabase.storage.from('cepatinvoice').upload(
      filePath, buffer, {contentType: req.file!.mimetype});
      
      if(error) throw new Error(error.message)

      const { publicUrl }= supabase.storage.from(`cepatinvoice`).getPublicUrl(filePath, {download: true}).data;

      (req as any).publicUrl = publicUrl;
      (req as any).filePath = filePath

      next()
    } catch (err) {
      next(err)
    }
  }
]

