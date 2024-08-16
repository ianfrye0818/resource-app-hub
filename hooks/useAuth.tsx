import { AuthContext } from '@/contexts/AuthProvider';
import { CustomError } from '@/lib/CustomError';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw CustomError.create('useAuth must be used within an AuthProvider');
  }
  return context;
};
