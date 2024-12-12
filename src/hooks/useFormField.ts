import { useState, useCallback } from 'react';

export function useFormField<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [value, handleChange] as const;
}