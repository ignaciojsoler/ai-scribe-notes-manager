import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePatientNotes } from '../hooks/usePatientNotes';
import type { Note } from '../types/note';

const NoteCard = ({ note }: { note: Note }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNotePreview = () => {
    const text = note.inputText || note.transcription || note.summary || '';
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => navigate(`/notes/${note.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Note #{note.id}</h3>
        <span className="text-sm text-gray-500">
          {formatDate(note.createdAt)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-700">Preview:</span>
          <div className="mt-1 text-gray-900 text-sm">
            {note.summary ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <span className="font-semibold text-blue-700">{children}</span>,
                  h2: ({ children }) => <span className="font-semibold text-blue-600">{children}</span>,
                  h3: ({ children }) => <span className="font-semibold text-blue-500">{children}</span>,
                  strong: ({ children }) => <span className="font-semibold">{children}</span>,
                  em: ({ children }) => <span className="italic">{children}</span>,
                  ul: ({ children }) => <ul className="list-disc list-inside ml-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside ml-2">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  p: ({ children }) => <p className="mb-1">{children}</p>,
                }}
              >
                {getNotePreview()}
              </ReactMarkdown>
            ) : (
              <p>{getNotePreview()}</p>
            )}
          </div>
        </div>
        
        {note.audioPath && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm text-blue-600">Audio available</span>
          </div>
        )}
        
        <div className="mt-4 text-xs text-blue-600 font-medium">
          Click to view full note →
        </div>
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

  const patientName = notes.length > 0 ? notes[0].patient.name : `Patient #${patientId}`;

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
        <div className="flex items-center gap-4">
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
        </div>
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
