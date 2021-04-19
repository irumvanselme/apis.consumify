import { Router } from "express";
import FileController from "../Controllers/FileController.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + getExt(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images"), FileController.upload);

function getExt(name) {
    let words = name.split(".");
    return "." + words[words.length - 1];
}

export default router;
