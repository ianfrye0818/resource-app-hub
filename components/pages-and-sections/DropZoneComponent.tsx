'use client';
import { Card } from '@/components/ui/card';
import { UploadIcon } from 'lucide-react';
import Dropzone from 'react-dropzone';
import useHandleResumeSubmit from '@/hooks/useHandleResumeSubmit';
import DataLoader from '@/components/ui/data-loader';
import { useState } from 'react';
import { Models } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeFirstLetter } from '@/lib/utils';

const acceptedFileTypes = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/pdf': ['.pdf'],
};

export default function DropZoneComponent() {
  const { error, loading, mutate: uploadResume } = useHandleResumeSubmit();
  const [type, setType] = useState<Models>(Models.GEMINI);

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
              Model: <AIModelSelect setType={setType} />
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
  setType: React.Dispatch<React.SetStateAction<Models>>;
}

function AIModelSelect({ setType }: AIModelSelectProps) {
  const modelOptions = Object.values(Models).map((model) => ({
    value: model,
    label: capitalizeFirstLetter(model),
  }));
  return (
    <Select
      onValueChange={(value) => setType(value as Models)}
      defaultValue={Models.GEMINI}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Model Type' />
      </SelectTrigger>
      <SelectContent>
        {modelOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
