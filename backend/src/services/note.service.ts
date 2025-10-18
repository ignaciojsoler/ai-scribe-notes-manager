import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { CreateNoteDto, UpdateNoteDto } from "../dtos/note.dto";

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

export const getAllNotes = async () => {
  return await prisma.note.findMany({
    include: {
      patient: true,
    },
  });
};

export const findNoteById = async (id: number) => {
  return await prisma.note.findUnique({
    where: { id },
    include: {
      patient: true,
    },
  });
};

export const updateNoteService = async (id: number, data: UpdateNoteDto) => {
  return await prisma.note.update({
    where: { id },
    data,
  });
};

export const deleteNoteService = async (id: number) => {
  return await prisma.note.delete({
    where: { id },
  });
};