import multer from "multer";
const path = "./uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage, dest: path });
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { path },
  } = req;

  res.json({ path });
};
