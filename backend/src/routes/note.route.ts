import { Router } from "express";
import multer from "multer";
import { saveNote } from "../controllers/note.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audioFile'), saveNote);

export default router;