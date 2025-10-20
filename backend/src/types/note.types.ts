export interface ProcessAudioParams {
  filePath: string;
  buffer: Buffer;
  originalName: string;
}

export interface SaveAudioFileParams {
  audioFile: Express.Multer.File;
}