export interface CreateNoteDto {
  patientId: number;
  inputText?: string;
  audioFile?: Express.Multer.File;
}