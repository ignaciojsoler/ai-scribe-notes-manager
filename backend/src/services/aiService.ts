// src/services/aiService.ts
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import fs from "fs";
import path from "path";
import mime from "mime-types";

const ai = new GoogleGenAI({}); // usa GOOGLE_API_KEY via env según la lib
const MAX_INLINE_BYTES = 20 * 1024 * 1024; // 20 MB
const MODEL = "gemini-2.5-flash"; // ajustá según lo que quieras usar

type TranscribeInput = {
  filePath: string;       // ruta local del archivo (si existe)
  buffer?: Buffer;        // buffer del archivo (opcional, si ya lo tenés)
  originalName?: string;  // nombre original para deducir mime
};

export async function transcribeAudio(input: TranscribeInput): Promise<string> {
  const { filePath, buffer, originalName } = input;
  // detect mime
  const ext = path.extname(originalName ?? filePath).replace(".", "");
  const mimeType = mime.lookup(ext) || mime.lookup(filePath) || "audio/mpeg";

  try {
    // si tenemos buffer y su tamaño <= 20MB, usar inline
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

      // según doc, resultado en resp.text
      return resp.text ?? "";
    }

    // en caso de archivo >20MB o no tenemos buffer -> subir con Files API
    // la doc usa ai.files.upload({ file: "path/to/file", config: { mimeType } })
    const uploaded = await ai.files.upload({
      file: filePath,
      config: { mimeType },
    });

    // usar createUserContent/createPartFromUri como en la doc
    const resp = await ai.models.generateContent({
      model: MODEL,
      contents: createUserContent([
        createPartFromUri(uploaded?.uri ?? "", uploaded?.mimeType ?? ""),
        "Generate a transcript of the speech.",
      ]),
    });

    return resp.text ?? "";
  } catch (err) {
    console.error("transcribeAudio error:", err);
    throw err;
  }
}
