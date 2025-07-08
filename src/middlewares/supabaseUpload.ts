import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { supabase } from "../configs/supabaseClient";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 },
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";
    if (!isImage && !isPdf) {
      return cb(new Error("Only image or PDF files are allowed"));
    }
    cb(null, true);
  },
});

export const uploadField = (fieldNames: string[]) => [
  upload.fields(fieldNames.map((name) => ({ name, maxCount: 1 }))),

  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).AuthUser.id;
    const files = req.files as Record<string, Express.Multer.File[]>;

    try {
      for (const fieldName of fieldNames) {
        const file = files?.[fieldName]?.[0];
        if (!file) continue;

        let extension = "file";

        if (file.mimetype.startsWith("image/")) {
          extension = "img";
        } else if (file.mimetype === "application/pdf") {
          extension = "pdf";
        }

        const buffer: Buffer = file.buffer;
        const fileName = `${Date.now()}_${extension}`;
        const filePath = `${userId}/${fileName}`;

        const { error } = await supabase.storage
          .from(fieldName)
          .upload(filePath, buffer, { contentType: file.mimetype });
        if (error) throw new Error(error.message);

        const { publicUrl } = supabase.storage
          .from(fieldName)
          .getPublicUrl(filePath).data;
        (req as any)[`${fieldName}Url`] = publicUrl;
        (req as any)[`${fieldName}Path`] = filePath;
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
