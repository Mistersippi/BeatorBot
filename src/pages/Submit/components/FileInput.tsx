import { useState, useRef } from 'react';
import { LucideIcon, Upload, X } from 'lucide-react';

interface FileInputProps {
  label: string;
  icon: LucideIcon;
  accept: string;
  onChange: (file: File | null) => void;
  helperText?: string;
  maxSize?: number; // in bytes
  recommendedDimensions?: string;
  required?: boolean;
}

export function FileInput({
  label,
  icon: Icon,
  accept,
  onChange,
  helperText,
  maxSize,
  recommendedDimensions,
  required
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      setSelectedFile(null);
      onChange(null);
      return;
    }

    // Validate file type
    const fileType = file.type.toLowerCase();
    const isValidType = accept.split(',').some(type => 
      fileType === type.trim() || file.name.toLowerCase().endsWith(type.trim().replace('*', ''))
    );

    if (!isValidType) {
      setError(`Invalid file type. Please upload a ${accept} file.`);
      return;
    }

    // Validate file size
    if (maxSize && file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    setSelectedFile(file);
    onChange(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {label}
          {required && <span className="text-red-500">*</span>}
        </div>
      </label>

      <div className="relative">
        <div 
          className={`min-h-[2.5rem] p-2 rounded-lg border ${
            error ? 'border-red-300' : 'border-gray-300'
          } focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent`}
        >
          {selectedFile ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{selectedFile.name}</span>
              <button
                type="button"
                onClick={clearFile}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 cursor-pointer"
                 onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          required={required}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
          {recommendedDimensions && (
            <span className="block">Recommended size: {recommendedDimensions}</span>
          )}
        </p>
      )}
    </div>
  );
}
