import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNote } from '../hooks/useNote';
import type { Note } from '../types/note';

const LoadingState = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading note...</span>
  </div>
);

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">
      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading note</h3>
    <p className="text-gray-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

const PatientInfoCard = ({ note }: { note: Note }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
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
};

const MarkdownRenderer = ({ content, title }: { content: string; title: string }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-lg font-semibold text-blue-700 mb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-base font-semibold text-blue-600 mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-semibold text-blue-500 mb-1">{children}</h3>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-700">{children}</em>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 ml-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1 ml-4">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-900 leading-relaxed">{children}</li>
            ),
            p: ({ children }) => (
              <p className="text-gray-900 leading-relaxed mb-2">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700 bg-blue-50 py-2 rounded-r">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const NoteContentCard = ({ note }: { note: Note }) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMainContent = () => {
    if (note.summary) return { type: 'Summary', content: note.summary };
    if (note.transcription) return { type: 'Transcription', content: note.transcription };
    if (note.inputText) return { type: 'Input Text', content: note.inputText };
    return { type: 'No Content', content: 'No content available for this note.' };
  };

  const mainContent = getMainContent();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Note #{note.id}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Created on {formatDateTime(note.createdAt)}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {mainContent.type}
        </span>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {note.summary && (
          <MarkdownRenderer content={note.summary} title="Clinical Summary" />
        )}

        {/* Transcription */}
        {note.transcription && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Transcription</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {note.transcription}
              </p>
            </div>
          </div>
        )}

        {/* Input Text */}
        {note.inputText && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Text</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {note.inputText}
              </p>
            </div>
          </div>
        )}

        {/* Audio File */}
        {note.audioPath && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Audio File</h3>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <div>
                <p className="text-gray-900 font-medium">Audio file available</p>
                <p className="text-sm text-gray-500">Audio recording attached to this note</p>
              </div>
              <audio src={note.audioPath} controls />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const noteId = id ? parseInt(id, 10) : 0;
  const { note, loading, error, refetch } = useNote(noteId);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!note) return <div className="text-center py-12">Note not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          to={`/patients/${note.patient.id}`}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Patient Notes
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Note Details</h1>
        <p className="mt-2 text-gray-600">View complete note information and patient details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NoteContentCard note={note} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <PatientInfoCard note={note} />
          </div>
        </div>
      </div>
    </div>
  );
};
