import { Request, Response, NextFunction } from "express";
import { getProfile, postInvoice } from "../services/invoice";
import { supabase } from "../configs/supabaseClient";
import { invoiceSchema } from "../validation/invoice";


export async function invoiceContoller(req: Request, res: Response, next: NextFunction){ 

  req.body.publicUrlPdf = (req as any).publicUrl

  console.log(req.body.publicUrlPdf);
  
  const filepath = (req as any).filePath
  const {id} = (req as any).payload

  const now = new Date()
  if(!req.body.noInvoice){
    const unique = String(Math.floor(Math.random() * 1000)).padStart(3, "0")
    const date = now.toISOString().slice(0, 10).replace(/-/g, "")
    req.body.noInvoice = `INV-gen-${date}-${unique}`
  }

  try{
    const profileId = await getProfile(id)
    req.body.profileId = profileId

    await invoiceSchema.validateAsync(req.body)

    const invoice = await postInvoice(req.body)

    res.status(200).json(invoice)

  } catch(err){
    await supabase.storage.from('cepatinvoice').remove([filepath])
    next(err)
  }
}