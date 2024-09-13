'use client';
import { EcolabEmployee } from '@/lib/types/ecolab.types';
import { createContext, useState } from 'react';

export const EcolabEmployeeListContext = createContext<{
  employees: EcolabEmployee[] | null;
  setEmployees: React.Dispatch<React.SetStateAction<EcolabEmployee[] | null>>;
}>({
  employees: null,
  setEmployees: () => null,
});

export default function EcolabEmployeeListProvider({
  defaultEmployees,
  children,
}: {
  defaultEmployees?: EcolabEmployee[];
  children: React.ReactNode;
}) {
  const [employees, setEmployees] = useState<EcolabEmployee[] | null>(
    defaultEmployees ? defaultEmployees : null
  );

  return (
    <EcolabEmployeeListContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EcolabEmployeeListContext.Provider>
  );
}
