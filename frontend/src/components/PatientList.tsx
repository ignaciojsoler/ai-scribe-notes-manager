import { usePatients } from '../hooks/usePatients';
import { LoadingState, ErrorState, EmptyState } from './ui';
import { PatientCard } from './cards';

export const PatientList = () => {
  const { patients, loading, error, refetch } = usePatients();

  if (loading) return <LoadingState message="Loading patients..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} title="Error loading patients" />;
  if (patients.length === 0) return (
    <EmptyState 
      title="No patients found"
      description="There are no patients in the system yet."
    />
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {patients.length} patient{patients.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};
