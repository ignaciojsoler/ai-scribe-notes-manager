import { createUserContent, createPartFromUri } from "@google/genai";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import ai from "../config/ai.config";

const MAX_INLINE_BYTES = 20 * 1024 * 1024; // 20 MB
const MODEL = "gemini-2.5-flash";

type TranscribeInput = {
  filePath: string;
  buffer?: Buffer;
  originalName?: string;
};

export async function transcribeAudio(input: TranscribeInput): Promise<string> {
  const { filePath, buffer, originalName } = input;
  const ext = path.extname(originalName ?? filePath).replace(".", "");
  const mimeType = mime.lookup(ext) || mime.lookup(filePath) || "audio/mpeg";

  try {
    const sizeBytes = buffer ? buffer.length : fs.statSync(filePath).size;

    if (buffer && sizeBytes <= MAX_INLINE_BYTES) {
      const base64Audio = buffer.toString("base64");
      const contents = [
        { text: "Generate a transcript of the speech." },
        {
          inlineData: {
            mimeType,
            data: base64Audio,
          },
        },
      ];

      const resp = await ai.models.generateContent({
        model: MODEL,
        contents,
      });

      return resp.text ?? "";
    }

    const uploaded = await ai.files.upload({
      file: filePath,
      config: { mimeType },
    });

    const resp = await ai.models.generateContent({
      model: MODEL,
      contents: createUserContent([
        createPartFromUri(uploaded?.uri ?? "", uploaded?.mimeType ?? ""),
        "Generate a transcript of the speech.",
      ]),
    });

    return resp.text ?? "";
  } catch (err) {
    console.error("Error transcribing audio:", err);
    throw err;
  }
}

export async function summarizeText(transcription: string): Promise<string> {
  const fallbackSummary =
    "Clinical note summary unavailable due to processing error.";

  if (!transcription || transcription.trim().length === 0) {
    return fallbackSummary;
  }

  try {
    const prompt = `
    You are a clinical documentation assistant.
    Summarize the following transcription strictly in SOAP format:
    Subjective, Objective, Assessment, and Plan.
    
    Rules:
    - Only include sections that contain information.
    - Do NOT write any introductions or explanations.
    - Do NOT say "Here is the summary" or similar.
    - Keep sentences short, factual, and clinically relevant.
    - If no clinical information exists, return exactly:
      "Summary cannot be generated: no clinical information provided."
    
    Transcription:
    ${transcription}
    
    Return the final summary formatted as Markdown, using bold section headers (e.g., **Subjective:**).`;

    const resp = await ai.models.generateContent({
      model: MODEL,
      contents: [{ text: prompt }],
    });

    const summary = resp.text?.trim();

    if (!summary || summary.length === 0) {
      console.warn("Empty summary generated, using fallback");
      return fallbackSummary;
    }

    return summary;
  } catch (err) {
    console.error("Error summarizing text:", err);
    return fallbackSummary;
  }
}
