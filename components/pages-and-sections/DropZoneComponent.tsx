'use client';
import { Card } from '@/components/ui/card';
import { UploadIcon } from 'lucide-react';
import Dropzone from 'react-dropzone';
import useHandleResumeSubmit from '@/hooks/useHandleResumeSubmit';
import DataLoader from '@/components/ui/data-loader';

const acceptedFileTypes = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/pdf': ['.pdf'],
};

export default function DropZoneComponent() {
  const { error, loading, mutate: uploadResume } = useHandleResumeSubmit();

  const handleChange = async (acceptedFile: File) => {
    try {
      await uploadResume(acceptedFile);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <DataLoader />;
  }

  return (
    <Dropzone
      disabled={loading}
      accept={acceptedFileTypes}
      onDropRejected={() => alert('invalid file type')}
      onDrop={(accptedFiles) => handleChange(accptedFiles[0])}
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => {
        return (
          <div>
            <Card
              {...getRootProps()}
              className='border-2 min-h-[300px] border-dashed border-black p-8 flex flex-col items-center justify-center space-y-4'
            >
              <div>
                <div className='flex flex-col items-center justify-center space-y-2'>
                  <UploadIcon className='size-8 text-primary-foreground' />
                  <input
                    {...getInputProps()}
                    disabled={loading}
                  />
                  <p className='text-muted-foreground'>Drag &amp; drop your file here</p>
                  <p className='text-xs text-muted-foreground'>or click to browse</p>
                </div>
              </div>
            </Card>
            {error && <p className='text-red-500 text-center my-4'>{error}</p>}
          </div>
        );
      }}
    </Dropzone>
  );
}
