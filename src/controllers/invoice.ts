import { Request, Response, NextFunction } from "express";
import { getProfile, postInvoice } from "../services/invoice";
import { supabase } from "../configs/supabaseClient";


export async function invoiceContoller(req: Request, res: Response, next: NextFunction){ 

  const publicurl = (req as any).publicurl
  const filepath = (req as any).filepath
  const payload = (req as any).payload
  const now = new Date()
  const body = req.body
  try{
    
    const profileId = await getProfile(payload.id)
    if(!req.body.noInvoice){
      const unique = String(Math.floor(Math.random() * 1000)).padStart(3, "0")
      const date = now.toISOString().slice(0, 10).replace(/-/g, "")

      req.body.noInvoice = `INV-gen-${date}-${unique}`
    }


    const invoice = await postInvoice(publicurl, profileId, req.body)
    res.status(200).json({invoice})

  } catch(err){
    await supabase.storage.from('cepatinvoice').remove([filepath])
    next(err)
  }
}