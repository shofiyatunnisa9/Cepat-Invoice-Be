import { Request, Response, NextFunction } from 'express';
import { getProfile, patchProfile, postProfile } from '../services/profile';
import { supabase } from '../configs/supabaseClient';
import { profileSchema } from '../validation/profile';

export async function getProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = (req as any).payload;
  try {
    const profile = await getProfile(id);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
}

export async function postProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.body.publicUrlImage = (req as any).publicUrl;
  req.body.userId = (req as any).payload.id;
  const filepath = (req as any).filePath;

  try {
    await profileSchema.validateAsync(req.body);

    const profile = await postProfile(req.body);

    res.status(200).json(profile);
  } catch (error) {
    await supabase.storage.from('cepatinvoice').remove([filepath]);
    next(error);
  }
}

export async function patchProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.body.publicUrlImage = (req as any).publicUrl;
  req.body.userId = (req as any).payload.id;

  try {
    const profile = await patchProfile(req.body);

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
}
