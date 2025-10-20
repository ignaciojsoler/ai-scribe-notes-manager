import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../base/apiClient';

export const NewNote = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();
  
  const [inputText, setInputText] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
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
      <div className="mb-6">
        <Link 
          to={`/patients/${patientId}`}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Notes
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Note</h1>
        <p className="mt-2 text-gray-600">Add a new note for this patient</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
              Note Text
            </label>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your note here..."
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-2">
              Audio File (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="audioFile" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload audio file</span>
                    <input
                      id="audioFile"
                      name="audioFile"
                      type="file"
                      accept="audio/*"
                      className="sr-only"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  Audio files only (MP3, WAV, etc.)
                </p>
              </div>
            </div>
            {audioFile && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Selected: {audioFile.name}</span>
                <button
                  type="button"
                  onClick={() => setAudioFile(null)}
                  className="text-red-600 hover:text-red-800 ml-2"
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

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
