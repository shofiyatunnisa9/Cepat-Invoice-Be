import { Request, Response, NextFunction } from "express";
import { getProfile, postInvoice } from "../services/invoice";


export async function invoiceContoller(req: Request, res: Response, next: NextFunction){ 
  try{
    
    const publicurl = (req as any).publicurl
    console.log('ddasdasdap', publicurl);
    const payload = (req as any).payload
    console.log('ddasdasdap', payload);

    const profileId = await getProfile(payload.id)

    const invoice = await postInvoice(publicurl, profileId, req.body)

    res.status(200).json({invoice})

  } catch(err){
    next(err)
  }
}