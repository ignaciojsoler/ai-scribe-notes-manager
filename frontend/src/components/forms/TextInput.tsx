interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  label?: string;
}

export const TextInput = ({ 
  value, 
  onChange, 
  placeholder = "Enter your text here...", 
  rows = 6, 
  disabled = false,
  label = "Note Text"
}: TextInputProps) => (
  <div>
    <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      id="inputText"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);
