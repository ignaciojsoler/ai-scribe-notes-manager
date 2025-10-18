import { Request, Response } from "express";
import { createNote, findNoteById, getAllNotes, updateNoteService, deleteNoteService, getNotesByPatientIdService } from "../services/note.service";

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

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await findNoteById(Number(req.params.id));
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error getting note' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const note = await updateNoteService(Number(req.params.id), req.body);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await deleteNoteService(Number(req.params.id));
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

export const getNotesByPatientId = async (req: Request, res: Response) => {
  try {
    const notes = await getNotesByPatientIdService(Number(req.params.patientId));
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error getting notes by patient id' });
  }
};