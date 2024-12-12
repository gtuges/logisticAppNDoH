export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PG', {
    style: 'currency',
    currency: 'PGK'
  }).format(amount);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};