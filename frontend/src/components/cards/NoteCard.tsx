import { useNavigate } from 'react-router-dom';
import { formatDateShort, MarkdownRenderer } from '../utils';
import type { Note } from '../../types/note';

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const navigate = useNavigate();
  
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
          {formatDateShort(note.createdAt)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-700">Preview:</span>
          <div className="mt-1 text-gray-900 text-sm">
            {note.summary ? (
              <MarkdownRenderer content={getNotePreview()} variant="preview" />
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
