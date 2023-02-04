import path from "path";
import express from "express";
import multer from "multer";
import { __dirname } from "../utils/index.js";

// Controller
import { controller } from "../controllers/main.js";

// Router
const router = express.Router();

// Storage de multer 
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = path.resolve(__dirname(import.meta.url), "../public/uploads");
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const fileName = req
            .body
            .nickname
            .replaceAll(" ", "-")
            .toLowerCase();
        const fileExtension = path.extname(file.originalname);
        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    }
});


// Upload function
const uploadFiles = multer({
    storage: diskStorage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = [".jpg", ".png"];
        const fileExtension = path.extname(file.originalname);
        const isAnAcceptedExtension = acceptedExtensions.includes(fileExtension);
        if (isAnAcceptedExtension) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

router.get("/", controller.index);

router.post("/save", uploadFiles.single("avatar"), controller.storeAvatar);

router.post("/save-api", uploadFiles.single("avatar"), controller.storeAvatarComoApi);

export default router;