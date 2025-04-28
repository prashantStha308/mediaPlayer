import multer from "multer";

const storage = multer.memoryStorage()

export const musicUpload = multer({ storage });