import React from 'react';
import { TabPanel } from '../../../../common/Tabs';
import AttachmentList from '../../../attachments/AttachmentList';
import FileUploadForm from '../../../attachments/FileUploadForm';
import { useAttachments } from '../../../hooks/useAttachments';

const AttachmentsPanel: React.FC = () => {
  const {
    attachments,
    isModalOpen,
    handleUpload,
    handleDelete,
    openModal,
    closeModal
  } = useAttachments();

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
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add File
          </button>
        </div>

        <AttachmentList
          attachments={attachments}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <FileUploadForm
            onSubmit={handleUpload}
            onCancel={closeModal}
          />
        )}
      </div>
    </TabPanel>
  );
};

export default AttachmentsPanel;