import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';
import type { Patient } from '../../types/patient';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/patients/${patient.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          ID: {patient.id}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Date of Birth:</span> {formatDate(patient.dateOfBirth)}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {patient.email}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-blue-600 font-medium">
        Click to view notes →
      </div>
    </div>
  );
};
