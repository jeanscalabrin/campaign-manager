import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    const hash = crypto.randomBytes(8).toString("hex");
    const filename = `${hash}-${file.originalname}`;
    cb(null, filename);
  },
});

export const upload = multer({
  storage,
  fileFilter(
    _req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF allowed"));
    }

    cb(null, true);
  },
});
