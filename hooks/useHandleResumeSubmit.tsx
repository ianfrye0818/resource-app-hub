'use client';

import { useState } from 'react';
import { isError as errorIsError } from '@/lib/utils';
import axios, { isAxiosError } from 'axios';
import { ErrorMessages } from '@/lib/data';

export default function useHandleResumeSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate(file: File) {
    setLoading(true);
    setError(null);

    try {
      if (!file) {
        throw new Error(ErrorMessages.NoFile);
      }
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume-parse`,
        formData,
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
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
      console.error(error);
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          setError(ErrorMessages.invalid);
        }
        if (error.response?.status === 429) {
          setError(ErrorMessages.RateLimit);
        }
      } else {
        setError(ErrorMessages.Unknown);
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, mutate };
}
