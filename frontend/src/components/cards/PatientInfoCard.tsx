import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import type { Note } from '../../types/note';

interface PatientInfoCardProps {
  note: Note;
}

export const PatientInfoCard = ({ note }: PatientInfoCardProps) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
    <div className="space-y-3">
      <div>
        <span className="text-sm font-medium text-gray-500">Name</span>
        <p className="text-gray-900">{note.patient.name}</p>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">Email</span>
        <p className="text-gray-900">{note.patient.email}</p>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500">Date of Birth</span>
        <p className="text-gray-900">{formatDate(note.patient.dateOfBirth)}</p>
      </div>
      <div className="pt-3 border-t border-gray-200">
        <Link
          to={`/patients/${note.patient.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          View all notes for this patient
        </Link>
      </div>
    </div>
  </div>
);
