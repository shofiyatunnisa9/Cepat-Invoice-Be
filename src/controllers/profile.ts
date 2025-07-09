import { Request, Response, NextFunction } from "express";
import { getProfile, patchProfile, postProfile } from "../services/profile";
import { supabase } from "../configs/supabaseClient";
import { editProfileSchema, profileSchema } from "../validation/profile";
import { createResponse, Status } from "../utils/response";

export async function getProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = (req as any).AuthUser;
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
  next: NextFunction
) {
  req.body.publicUrlImage = (req as any).logosUrl;
  req.body.userId = (req as any).AuthUser.id;
  const filepath = (req as any).filePath;
  try {
    await profileSchema.validateAsync(req.body);

    const profile = await postProfile(req.body);

    res.status(201).json(profile);
  } catch (error) {
    await supabase.storage.from("logos").remove([filepath]);
    next(error);
  }
}

// export async function patchProfileController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   req.body.publicUrlImage = (req as any).logosUrl;
//   req.body.userId = (req as any).AuthUser.id;

//   try {
//     await editProfileSchema.validateAsync(req.body);

//     const profile = await patchProfile(req.body);

//     res
//       .status(200)
//       .json(createResponse(Status.success, 200, "Patch Profile", profile));
//   } catch (err) {
//     next(err);
//   }
// }
