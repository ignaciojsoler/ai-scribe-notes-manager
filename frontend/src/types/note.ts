import type { Patient } from "./patient";

export interface Note {
  id: number;
  patientId: number;
  inputText: string | null;
  transcription: string | null;
  summary: string | null;
  audioPath: string | null;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
}
