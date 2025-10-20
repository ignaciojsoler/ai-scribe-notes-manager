interface AudioUploadProps {
  audioFile: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

export const AudioUpload = ({ audioFile, onFileChange, disabled = false }: AudioUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
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
                disabled={disabled}
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
            onClick={() => onFileChange(null)}
            className="text-red-600 hover:text-red-800 ml-2"
            disabled={disabled}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
