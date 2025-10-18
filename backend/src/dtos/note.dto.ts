export type CreateNoteDto = {
  patientId: number;
  inputText?: string | null;
  audioFile?: {
    buffer: Buffer;
    originalname: string;
    mimetype?: string;
    size?: number;
  } | null;
};

export interface UpdateNoteDto {
  inputText?: string;
  transcription?: string;
  summary?: string;
}
