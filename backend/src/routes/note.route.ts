import { Router } from "express";
import multer from "multer";
import { deleteNote, getNoteById, getNotes, saveNote, updateNote } from "../controllers/note.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('audioFile'), saveNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;