import { useState, useEffect, useCallback } from 'react';
import type { Note } from '../types/note';
import apiClient from '../base/apiClient';

interface UsePatientNotesReturn {
  notes: Note[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePatientNotes = (patientId: number): UsePatientNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<Note[]>(`/notes/patient/${patientId}`);
      
      setNotes(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    if (patientId) {
      fetchNotes();
    }
  }, [fetchNotes, patientId]);

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes,
  };
};
