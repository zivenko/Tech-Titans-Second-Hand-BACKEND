import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const { _id } = req.user;
    const uniquePrefix = `${Date.now()}_${_id}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return callback(HttpError(400, ".exe extention not allowed "));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});


export default upload;
