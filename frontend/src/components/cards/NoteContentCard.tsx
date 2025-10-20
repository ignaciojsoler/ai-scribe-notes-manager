import { formatDateTime, MarkdownRenderer } from '../utils';
import type { Note } from '../../types/note';

interface NoteContentCardProps {
  note: Note;
}

export const NoteContentCard = ({ note }: NoteContentCardProps) => {
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
                <p className="text-sm text-gray-500">Audio recording attached to this note (feature not implemented)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
