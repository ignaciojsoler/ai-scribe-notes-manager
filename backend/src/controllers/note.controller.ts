import { Request, Response } from "express";
import { createNote, getAllNotes } from "../services/note.service";

export const saveNote = async (req: Request, res: Response) => {
  try {
    const patientId = Number(req.body?.patientId);
    const inputText = req.body?.inputText;
    const audioFile = req.file;

    if (!patientId || (!inputText && !audioFile)) {
      return res.status(400).json({ message: 'Must send patientId and at least inputText or audioFile' });
    }

    const note = await createNote({ patientId, inputText, audioFile });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating new note' });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error getting notes' });
  }
};
