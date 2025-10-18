import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { CreateNoteDto, UpdateNoteDto } from "../dtos/note.dto";
import { transcribeAudio } from "./aiService";
import mime from "mime-types";

const prisma = new PrismaClient();

export const createNote = async ({ patientId, inputText, audioFile }: CreateNoteDto) => {
  let audioPath: string | null = null;
  let transcription: string | null = null;

  try {
    if (audioFile) {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // nombre único para evitar colisiones
      const timestamp = Date.now();
      const safeName = `${timestamp}-${audioFile.originalname}`;
      const filePath = path.join(uploadDir, safeName);

      // escribir archivo
      fs.writeFileSync(filePath, audioFile.buffer);
      audioPath = filePath;

      // transcribir (aiService decide inline vs upload)
      transcription = await transcribeAudio({
        filePath,
        buffer: audioFile.buffer,
        originalName: audioFile.originalname,
      });

      // opcional: guardá also detected mime tipo en DB si querés
      const detectedMime = mime.lookup(audioFile.originalname) ?? null;
      console.info("Saved audio to", filePath, "mime:", detectedMime);
    }

    // crear nota en DB
    const note = await prisma.note.create({
      data: {
        patientId,
        inputText: inputText ?? null,
        transcription: transcription ?? null,
        summary: null,
        audioPath,
      },
    });

    return note;
  } catch (err) {
    console.error("createNote error:", err);
    // si algo falló y el archivo fue escrito, opcionalmente borrarlo:
    if (audioPath && fs.existsSync(audioPath)) {
      try {
        fs.unlinkSync(audioPath);
      } catch (e) {
        console.warn("Failed to cleanup audio file:", audioPath, e);
      }
    }
    throw err;
  } finally {
    // no hacer prisma.$disconnect() aquí si Prisma se maneja a nivel app
  }
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

export const getNotesByPatientIdService = async (patientId: number) => {
  return await prisma.note.findMany({
    where: { patientId },
    include: {
      patient: true,
    },
  });
};