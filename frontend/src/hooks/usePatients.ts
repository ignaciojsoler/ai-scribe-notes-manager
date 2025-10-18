import { useState, useEffect } from 'react';
import type { Patient } from '../types/patient';
import apiClient from '../base/apiClient';

interface UsePatientsReturn {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePatients = (): UsePatientsReturn => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get<Patient[]>('/patients');
      
      setPatients(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
  };
};
