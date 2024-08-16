'use client';

import { useState } from 'react';
import { ErrorMessages } from '@/lib/data';
import { Models } from '@/lib/types/AI.types';
import { ApiRoutes } from '@/api/api-routes';
import clientAxios from '@/api/clientAxios';
import { CustomError } from '@/lib/CustomError';

export default function useHandleResumeSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate(file: File, type: Models) {
    setLoading(true);
    setError(null);

    try {
      if (!file) {
        throw CustomError.create(ErrorMessages.NoFile);
      }
      const formData = new FormData();
      formData.append('file', file);

      const response = await clientAxios.post<Blob>(
        ApiRoutes.resumeParser.generateFormattedResume(type),
        formData,
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const blob = response.data;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'resume.docx';

      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return url;
    } catch (error) {
      console.error(['handleResumeUpload'], error);
      setError(CustomError.isCustomError(error) ? error.message : ErrorMessages.Unknown);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, mutate };
}
