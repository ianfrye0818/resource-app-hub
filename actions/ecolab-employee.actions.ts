'use server';

import { ApiRoutes } from '@/api/api-routes';
import { createServerAxios } from '@/api/serverAxios';
import { EcolabEmployee } from '@/lib/types/ecolab.types';
import { CreateEcolabEmployeeSchemaValues } from '@/lib/types/zod-schema.types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addEcolabEmployee(data: CreateEcolabEmployeeSchemaValues) {
  try {
    const axiosInstance = createServerAxios(cookies());
    const response = await axiosInstance.post<EcolabEmployee>(
      ApiRoutes.ecolab.employee.createEmployee,
      data
    );
    revalidatePath('/ecolab/beeline-employees');
    return response.data;
  } catch (error) {
    console.error(['Error adding ecolab employee'], error);
    throw error;
  }
}
