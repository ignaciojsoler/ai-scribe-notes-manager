import { Router } from "express";
import { fetchPatients } from "../controllers/patient.controller";
import { getNotesByPatientId } from "../controllers/note.controller";

const router = Router();

router.get('/', fetchPatients);
router.get('/:id/notes', getNotesByPatientId);

export default router;