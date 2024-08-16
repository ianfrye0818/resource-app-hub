'use client';
import { CreateEcolabEmployeeSchemaValues } from '@/lib/types/zod-schema.types';
import { CreateEcolabEmployeeSchema } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePickerFormItem } from './form-date-picker-item';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { FormInputItem } from './form-input-item';

export default function AddEcolabEmployeeForm() {
  const form = useForm<CreateEcolabEmployeeSchemaValues>({
    defaultValues: {
      birthDate: new Date(),
      bullhornId: '',
      firstName: '',
      lastName: '',
    },
    resolver: zodResolver(CreateEcolabEmployeeSchema),
  });

  const saveToDbAndReset = async () => {
    console.log('reset');
  };
  const saveToDbAndNavigate = async () => {
    console.log('navigate');
  };

  return (
    <div className='w-full max-w-[650px] md:border md:shadow-sm md:rounded-md md:p-8 p-2 '>
      <Form {...form}>
        <form className='flex flex-col gap-5'>
          <FormInputItem<typeof CreateEcolabEmployeeSchema>
            control={form.control}
            name='bullhornId'
            label='Bullhorn ID'
            maxLength={6}
          />
          <FormInputItem<typeof CreateEcolabEmployeeSchema>
            control={form.control}
            name='firstName'
            label='First Name'
          />
          <FormInputItem<typeof CreateEcolabEmployeeSchema>
            control={form.control}
            name='lastName'
            label='Last Name'
          />
          <DatePickerFormItem<typeof CreateEcolabEmployeeSchema>
            control={form.control}
            name='birthDate'
            label='Birth Date'
          />
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              onClick={form.handleSubmit(saveToDbAndNavigate)}
              className='flex-1 bg-blue-600 hover:bg-blue-600 hover:opacity-80'
            >
              Save and Return
            </Button>
            <Button
              onClick={form.handleSubmit(saveToDbAndReset)}
              type='button'
              className='flex-1 bg-blue-600 hover:bg-blue-600 hover:opacity-80'
            >
              Save and Add Another
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
