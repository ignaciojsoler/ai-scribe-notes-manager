import { Router } from "express";
import { fetchPatients } from "../controllers/patient.controller";

const router = Router();

router.get('/', fetchPatients);

export default router;