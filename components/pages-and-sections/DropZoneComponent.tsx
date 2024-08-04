'use client';
import { Card } from '@/components/ui/card';
import { UploadIcon } from 'lucide-react';
import Dropzone from 'react-dropzone';
import useHandleResumeSubmit from '@/hooks/useHandleResumeSubmit';
import DataLoader from '@/components/ui/data-loader';
import { Models } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ModelList } from '@/lib/data';

import useLocalstorageState from '@/hooks/useLocalStroage';

const acceptedFileTypes = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/pdf': ['.pdf'],
};

export default function DropZoneComponent() {
  const { error, loading, mutate: uploadResume } = useHandleResumeSubmit();
  const [type, setType] = useLocalstorageState<Models>('model', Models.GEMINI);

  const handleChange = async (acceptedFile: File) => {
    try {
      await uploadResume(acceptedFile, type);
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
            <div className='flex gap-2 items-center mb-3 justify-center'>
              Model:{' '}
              <AIModelSelect
                setType={setType}
                type={type}
              />
            </div>
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

interface AIModelSelectProps {
  setType: (value: Models) => void;
  type: Models;
}

function AIModelSelect({ setType, type }: AIModelSelectProps) {
  return (
    <Select
      value={type}
      onValueChange={(value: Models) => {
        setType(value);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue defaultValue={type} />
      </SelectTrigger>
      <SelectContent>
        {ModelList.map((model) => (
          <SelectItem
            key={model.value}
            value={model.value}
          >
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
