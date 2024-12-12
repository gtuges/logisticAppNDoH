import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '../../common/Button';
import FormField from '../../common/FormField';
import { AttachmentFormData } from '../../../types/attachment';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../constants';
import { formatFileSize } from '../../../utils/format';

interface FileUploadFormProps {
  onSubmit: (data: AttachmentFormData) => void;
  onCancel: () => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AttachmentFormData['category']>('Other');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = Object.values(ALLOWED_FILE_TYPES).join(',');

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`);
      return false;
    }

    const fileType = Object.keys(ALLOWED_FILE_TYPES).find(type => file.type === type);
    if (!fileType) {
      setError('Invalid file type. Please upload a supported file format.');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    onSubmit({ file: selectedFile, description, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}
          hover:border-gray-400 transition-colors cursor-pointer
        `}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={allowedExtensions}
          className="hidden"
        />

        {selectedFile ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium text-gray-900">{selectedFile.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-gray-600">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, Word, Excel, Images (max {formatFileSize(MAX_FILE_SIZE)})
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}

      <FormField label="Category" required>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as AttachmentFormData['category'])}
          className="form-select"
          required
        >
          <option value="Receipt">Receipt</option>
          <option value="Invoice">Invoice</option>
          <option value="Other">Other</option>
        </select>
      </FormField>

      <FormField label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows={3}
          placeholder="Add a description for this file (optional)"
        />
      </FormField>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" icon={Upload}>
          Upload File
        </Button>
      </div>
    </form>
  );
};

export default FileUploadForm;