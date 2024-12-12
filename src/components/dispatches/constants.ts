export const TABS = [
  { id: 0, label: 'Receipt Details' },
  { id: 1, label: 'Invoice Details' },
  { id: 2, label: 'Attachments' }
] as const;

export type TabId = typeof TABS[number]['id'];

export const ALLOWED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg,.jpeg',
  'image/png': '.png',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx'
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB