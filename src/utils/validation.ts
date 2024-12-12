export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value) && value > 0;
  if (Array.isArray(value)) return value.length > 0;
  return !!value;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s-()]{8,}$/;
  return phoneRegex.test(phone);
};

export const validateDecimal = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

export const validateDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};