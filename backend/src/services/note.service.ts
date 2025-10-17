import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { CreateNoteDto } from "../dtos/note.dto";

const prisma = new PrismaClient();

export const createNote = async ({ patientId, inputText, audioFile }: CreateNoteDto) => {
  let audioPath: string | null = null;

  if (audioFile) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    
    const filePath = path.join(uploadDir, audioFile.originalname);
    fs.writeFileSync(filePath, audioFile.buffer);
    audioPath = filePath;
  }

  const note = await prisma.note.create({
    data: {
      patientId,
      inputText: inputText ?? null,
      transcription: null, // TODO: AI transcription here
      summary: null,
      audioPath,
    },
  });

  return note;
};
