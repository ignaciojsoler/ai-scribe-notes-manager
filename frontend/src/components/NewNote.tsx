import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../base/apiClient';
import { PageHeader } from './layout';
import { TextInput, AudioUpload } from './forms';

export const NewNote = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();
  
  const [inputText, setInputText] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setAudioFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim() && !audioFile) {
      setError('Please enter some text or upload an audio file');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('patientId', patientId.toString());
      
      if (inputText.trim()) {
        formData.append('inputText', inputText.trim());
      }
      
      if (audioFile) {
        formData.append('audioFile', audioFile);
      }
      
      await apiClient.post('/notes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate(`/patients/${patientId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Create New Note"
        subtitle="Add a new note for this patient"
        backTo={{ path: `/patients/${patientId}`, label: "Back to Notes" }}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="space-y-6">
          <TextInput
            value={inputText}
            onChange={setInputText}
            disabled={loading}
            placeholder="Enter your note here..."
          />

          <AudioUpload
            audioFile={audioFile}
            onFileChange={handleFileChange}
            disabled={loading}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Link
              to={`/patients/${patientId}`}
              className={`px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || (!inputText.trim() && !audioFile)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Note
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
