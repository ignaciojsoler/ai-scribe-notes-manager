export interface Patient {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string; // ISO date string from API
  createdAt: string;
  updatedAt: string;
}
