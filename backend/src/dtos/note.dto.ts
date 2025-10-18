export interface CreateNoteDto {
  patientId: number;
  inputText?: string;
  audioFile?: Express.Multer.File;
}

export interface UpdateNoteDto {
  inputText?: string;
  transcription?: string;
  summary?: string;
}