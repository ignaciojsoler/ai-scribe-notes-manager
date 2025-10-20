import fs from "fs";
import path from "path";
import { summarizeText, transcribeAudio } from "../../services/ai.service";
import { ProcessAudioParams, SaveAudioFileParams } from "../../types/note.types";

export const saveAudioFile = ({ audioFile }: SaveAudioFileParams): string => {
  const uploadDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const timestamp = Date.now();
  const safeName = `${timestamp}-${audioFile.originalname}`;
  const filePath = path.join(uploadDir, safeName);

  fs.writeFileSync(filePath, audioFile.buffer);

  return filePath;
};

export const transcribeAndSummarize = async ({
  filePath,
  buffer,
  originalName,
}: ProcessAudioParams) => {
  const transcription = await transcribeAudio({ filePath, buffer, originalName });

  if (!transcription || !transcription.trim()) {
    return { transcription: null, summary: null };
  }

  const summary = await summarizeText(transcription);
  return { transcription, summary };
};
