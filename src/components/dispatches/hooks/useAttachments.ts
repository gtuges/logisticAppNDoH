import { useState } from 'react';
import { Attachment, AttachmentFormData } from '../../../types/attachment';
import { showToast } from '../../../utils/toast';

export const useAttachments = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = (data: AttachmentFormData) => {
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      fileName: data.file.name,
      fileType: data.file.type,
      fileSize: data.file.size,
      uploadDate: new Date().toISOString(),
      description: data.description,
      category: data.category,
      url: URL.createObjectURL(data.file)
    };

    setAttachments(prev => [...prev, newAttachment]);
    setIsModalOpen(false);
    showToast.success('File uploaded successfully');
  };

  const handleDelete = (attachment: Attachment) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setAttachments(prev => prev.filter(a => a.id !== attachment.id));
      URL.revokeObjectURL(attachment.url);
      showToast.success('File deleted successfully');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    attachments,
    isModalOpen,
    handleUpload,
    handleDelete,
    openModal,
    closeModal
  };
};