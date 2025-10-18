import { useState, useEffect, useCallback } from 'react';
import type { Note } from '../types/note';
import apiClient from '../base/apiClient';

interface UseNoteReturn {
  note: Note | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useNote = (noteId: number): UseNoteReturn => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<Note>(`/notes/${noteId}`);
      setNote(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch note');
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    if (noteId) {
      fetchNote();
    }
  }, [fetchNote, noteId]);

  return {
    note,
    loading,
    error,
    refetch: fetchNote,
  };
};
