export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  description: string;
  category: 'Receipt' | 'Invoice' | 'Other';
  url: string;
}

export interface AttachmentFormData {
  file: File;
  description: string;
  category: Attachment['category'];
}