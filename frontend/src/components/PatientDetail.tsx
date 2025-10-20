import { useParams, Link } from 'react-router-dom';
import { usePatientNotes } from '../hooks/usePatientNotes';
import { LoadingState, ErrorState, EmptyState } from './ui';
import { NoteCard } from './cards';
import { PageHeader } from './layout';


export const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id ? parseInt(id, 10) : 0;
  const { notes, loading, error, refetch } = usePatientNotes(patientId);

  if (loading) return <LoadingState message="Loading notes..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} title="Error loading notes" />;

  const patientName = notes.length > 0 ? notes[0].patient.name : `Patient #${patientId}`;

  const actions = (
    <>
      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
        {notes.length} note{notes.length !== 1 ? 's' : ''}
      </span>
      <Link
        to={`/patients/${patientId}/new-note`}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create New Note
      </Link>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${patientName}'s Notes`}
        backTo={{ path: "/", label: "Back to Patients" }}
        actions={actions}
      />
      
      {notes.length === 0 ? (
        <EmptyState 
          title="No notes found"
          description={`No notes have been created for ${patientName} yet.`}
          icon={
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
      ) : (
        <div className="space-y-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};
