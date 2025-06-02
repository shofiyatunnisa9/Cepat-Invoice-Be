import multer from "multer"
import path from "path"

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const isAllowed = [".jpg", ".jpeg", ".png"].includes(ext)
    const isPdf = file.mimetype === "application/pdf"
    console.log(file.mimetype)

    if(isAllowed || isPdf){
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format") as any, false)
    }
  }
})