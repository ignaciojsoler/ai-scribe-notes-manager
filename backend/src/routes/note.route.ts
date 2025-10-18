import { Router } from "express";
import multer from "multer";
import { getNoteById, getNotes, saveNote } from "../controllers/note.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audioFile'), saveNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);

export default router;