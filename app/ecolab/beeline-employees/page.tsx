import { ApiRoutes } from '@/api/api-routes';
import { createServerAxios } from '@/api/serverAxios';
import React from 'react';
import { cookies } from 'next/headers';
import { EcolabEmployee } from '@/lib/types/ecolab.types';
import { BASE_API_URL } from '@/lib/constants';
import { isAxiosError } from 'axios';
import { APIError } from '@/lib/CustomAxiosError';
import { CustomError } from '@/lib/CustomError';
import { isError } from '@/lib/utils';
import { ErrorMessages } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EcolabEmployeeListProvider from '@/contexts/EcolabEmployeeListContext';

const fetchBeelineEmployees = async () => {
  try {
    const cookieStore = cookies();
    const axiosInstance = createServerAxios(cookieStore);
    const resp = await axiosInstance.get<EcolabEmployee[]>(
      BASE_API_URL + ApiRoutes.ecolab.employee.getAllEmployees
    );

    return { data: resp.data, error: null };
  } catch (error) {
    console.error(['fetchBeelineEmployees'], error);
    if (isAxiosError(error)) return { data: null, error: new APIError(error) };
    return {
      data: null,
      error: CustomError.create(isError(error) ? error.message : ErrorMessages.Unknown),
    };
  }
};

export default async function EcolabBeeLine() {
  const { data: employees, error } = await fetchBeelineEmployees();
  if (error) {
    return (
      <div className='h-full w-full flex justify-center items-center gap-5 flex-col'>
        <h1 className='text-2xl font-bold'>{error.message}</h1>
        <Button asChild>
          <Link href='/'>Go Home</Link>
        </Button>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className='container mx-auto flex flex-col gap-4'>
        <AddEmployeeLink />
        No employees found
      </div>
    );
  }
  return (
    <div className='container mx-auto flex flex-col'>
      <AddEmployeeLink />
      <EcolabEmployeeListProvider defaultEmployees={employees}>
        <div>
          {employees.map((employee) => (
            <div key={employee.bullhornId}>{employee.firstName}</div>
          ))}
        </div>
      </EcolabEmployeeListProvider>
    </div>
  );
}

function AddEmployeeLink() {
  return (
    <Button
      className='ml-auto'
      asChild
    >
      <Link href='/ecolab/beeline-employees/add-employee'>Add Employee</Link>
    </Button>
  );
}
