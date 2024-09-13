import { EcolabEmployeeListContext } from '@/contexts/EcolabEmployeeListContext';
import { useContext } from 'react';

export default function useEcolabEmployees() {
  const context = useContext(EcolabEmployeeListContext);
  if (!context) {
    throw new Error('useEcolabEmployees must be used within a EcolabEmployeeListProvider');
  }
  return context;
}
