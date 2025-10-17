import { Router } from "express";
import patientRoutes from "./patient.route";

const router = Router();

router.use('/patients', patientRoutes);

export default router;