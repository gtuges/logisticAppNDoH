import React from 'react';
import { FileText, Download, Trash2, Image, FileSpreadsheet } from 'lucide-react';
import { formatFileSize } from '../../../utils/format';
import { Attachment } from '../../../types/attachment';
import Button from '../../common/Button';

interface AttachmentListProps {
  attachments: Attachment[];
  onDelete: (attachment: Attachment) => void;
}

const AttachmentList: React.FC<AttachmentListProps> = ({ attachments, onDelete }) => {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return Image;
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return FileSpreadsheet;
    return FileText;
  };

  const getCategoryColor = (category: Attachment['category']) => {
    switch (category) {
      case 'Receipt':
        return 'bg-blue-50 text-blue-700';
      case 'Invoice':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {attachments.map((attachment) => {
        const Icon = getFileIcon(attachment.fileType);
        const categoryColor = getCategoryColor(attachment.category);

        return (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Icon className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{attachment.fileName}</h4>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                  <span>{formatFileSize(attachment.fileSize)}</span>
                  <span>•</span>
                  <span>{new Date(attachment.uploadDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
                    {attachment.category}
                  </span>
                </div>
                {attachment.description && (
                  <p className="mt-1 text-sm text-gray-600">{attachment.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Download}
                onClick={() => window.open(attachment.url, '_blank')}
              >
                Download
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => onDelete(attachment)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
      {attachments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No attachments uploaded yet
        </div>
      )}
    </div>
  );
};

export default AttachmentList;