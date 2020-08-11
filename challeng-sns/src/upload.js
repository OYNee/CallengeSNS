import multer from "multer";
const path = "./uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, "file" + "_" + file.originalname);
  },
});
const upload = multer({ storage, dest: path });
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  console.log(req);
  const {
    file: { path },
  } = req;
  res.json({ path });
};
