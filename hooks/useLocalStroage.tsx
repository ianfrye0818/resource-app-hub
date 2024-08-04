import { useEffect, useState } from 'react';

export default function useLocalstorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const localstorageValue = localStorage.getItem(key);

    if (localstorageValue !== null) {
      try {
        setValue(localstorageValue as unknown as T);
      } catch (error) {
        console.error('Error parsing localStorage value:', error);
      }
    }
    setIsInitialized(true);
  }, [key]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, value as unknown as string);
    }
  }, [isInitialized, key, value]);

  return [value, setValue] as const;
}
