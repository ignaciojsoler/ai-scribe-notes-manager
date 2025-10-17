import { Router } from "express";
import patientRoutes from "./patient.route";
import noteRoutes from "./note.route";

const router = Router();

router.use('/patients', patientRoutes);
router.use('/notes', noteRoutes);

export default router;