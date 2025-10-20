import fs from "fs";
import { CreateNoteDto, UpdateNoteDto } from "../dtos/note.dto";
import { summarizeText } from "./index";
import { saveAudioFile, transcribeAndSummarize } from "../utils/helpers/note.helpers";
import prisma from "../config/db.config";

export const createNote = async ({ patientId, inputText, audioFile }: CreateNoteDto) => {
  let audioPath: string | null = null;
  let transcription: string | null = null;
  let summary: string | null = null;

  try {
    if (audioFile) {
      audioPath = saveAudioFile({ audioFile: audioFile as Express.Multer.File });
      const result = await transcribeAndSummarize({
        filePath: audioPath,
        buffer: audioFile.buffer,
        originalName: audioFile.originalname,
      });
      transcription = result.transcription;
      summary = result.summary;
    } else if (inputText?.trim()) {
      summary = await summarizeText(inputText);
    }

    const note = await prisma.note.create({
      data: {
        patientId,
        inputText: inputText ?? null,
        transcription,
        summary,
        audioPath,
      },
    });

    return note;
  } catch (error) {
    if (audioPath && fs.existsSync(audioPath)) {
      try {
        fs.unlinkSync(audioPath);
      } catch (cleanupError) {
        console.warn("Failed to cleanup audio file:", audioPath, cleanupError);
      }
    }
    throw error;
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