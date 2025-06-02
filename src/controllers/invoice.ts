import { Request, Response, NextFunction } from "express";


export function invoiceContoller(req: Request, res: Response, next: NextFunction){ 
  try{
    const publicurl = (req as any).publicurl
    const payload = (req as any).payload

    res.status(200).json({publicurl, payload})

  } catch(err){
    next(err)
  }



}