import { Router } from "express";
import multer from "multer";
import { getNotes, saveNote } from "../controllers/note.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audioFile'), saveNote);
router.get('/', getNotes);

export default router;