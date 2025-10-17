import { Request, Response } from "express";
import { getPatients } from "../services/patient.service";

export const fetchPatients = async (req: Request, res: Response) => {
  try {
    const patients = await getPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error getting patients' });
  }
}