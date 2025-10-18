import { useParams, Link } from 'react-router-dom';
import { usePatientNotes } from '../hooks/usePatientNotes';
import type { Note } from '../types/note';

const NoteCard = ({ note }: { note: Note }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Note #{note.id}</h3>
        <span className="text-sm text-gray-500">
          {formatDate(note.createdAt)}
        </span>
      </div>
      
      <div className="space-y-3">
        {note.inputText && (
          <div>
            <span className="font-medium text-gray-700">Input Text:</span>
            <p className="mt-1 text-gray-900">{note.inputText}</p>
          </div>
        )}
        
        {note.transcription && (
          <div>
            <span className="font-medium text-gray-700">Transcription:</span>
            <p className="mt-1 text-gray-900">{note.transcription}</p>
          </div>
        )}
        
        {note.summary && (
          <div>
            <span className="font-medium text-gray-700">Summary:</span>
            <p className="mt-1 text-gray-900">{note.summary}</p>
          </div>
        )}
        
        {note.audioPath && (
          <div>
            <span className="font-medium text-gray-700">Audio:</span>
            <p className="mt-1 text-blue-600">Audio file available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading notes...</span>
  </div>
);

const EmptyState = ({ patientName }: { patientName: string }) => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4">
      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
    <p className="text-gray-500">No notes have been created for {patientName} yet.</p>
  </div>
);

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">
      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading notes</h3>
    <p className="text-gray-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

export const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id ? parseInt(id, 10) : 0;
  const { notes, loading, error, refetch } = usePatientNotes(patientId);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  // Get patient name from the first note (if available)
  const patientName = notes.length > 0 ? notes[0].patient.name : 'Patient';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Patients
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{patientName}'s Notes</h1>
        </div>
        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {notes.length === 0 ? (
        <EmptyState patientName={patientName} />
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
