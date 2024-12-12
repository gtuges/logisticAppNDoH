import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TabPanel } from '../../common/Tabs';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import FileUploadForm from './FileUploadForm';
import AttachmentList from './AttachmentList';
import { Attachment, AttachmentFormData } from '../../../types/attachment';
import toast from 'react-hot-toast';

const AttachmentsPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleUpload = (data: AttachmentFormData) => {
    // In a real application, you would upload the file to a server here
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      fileName: data.file.name,
      fileType: data.file.type,
      fileSize: data.file.size,
      uploadDate: new Date().toISOString(),
      description: data.description,
      category: data.category,
      url: URL.createObjectURL(data.file) // Temporary URL for demo
    };

    setAttachments(prev => [...prev, newAttachment]);
    setIsModalOpen(false);
    toast.success('File uploaded successfully');
  };

  const handleDelete = (attachment: Attachment) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setAttachments(prev => prev.filter(a => a.id !== attachment.id));
      URL.revokeObjectURL(attachment.url); // Clean up temporary URL
      toast.success('File deleted successfully');
    }
  };

  return (
    <TabPanel>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
            <p className="text-sm text-gray-500 mt-1">
              Upload and manage delivery-related documents
            </p>
          </div>
          <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add File
          </Button>
        </div>

        <AttachmentList
          attachments={attachments}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload File"
        size="lg"
      >
        <FileUploadForm
          onSubmit={handleUpload}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </TabPanel>
  );
};

export default AttachmentsPanel;