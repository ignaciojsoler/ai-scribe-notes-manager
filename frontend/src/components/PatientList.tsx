import { usePatients } from '../hooks/usePatients';
import type { Patient } from '../types/patient';

const PatientCard = ({ patient }: { patient: Patient }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
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
    </div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading patients...</span>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4">
      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
    <p className="text-gray-500">There are no patients in the system yet.</p>
  </div>
);

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">
      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading patients</h3>
    <p className="text-gray-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

export const PatientList = () => {
  const { patients, loading, error, refetch } = usePatients();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (patients.length === 0) return <EmptyState />;

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
