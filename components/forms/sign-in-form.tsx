'use client';
import { SignInFormSchema, SignInFormValues } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { FormInputItem } from './form-input-item';
import { Button } from '../ui/button';
import useSubmitSignInForm from '@/hooks/forms/useSubmitSignInForm';

export default function SignInForm() {
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = useSubmitSignInForm({ form });
  const globalError = form.formState.errors.root;

  return (
    <div className='mx-auto max-w-[450px] space-y-6 py-12'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Welcome back</h1>
        <p className='text-muted-foreground'>Enter your credentials to access your account</p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormInputItem<typeof SignInFormSchema>
                control={form.control}
                name='email'
                placeholder='Email'
                label='Email'
              />
              <FormInputItem<typeof SignInFormSchema>
                control={form.control}
                name='password'
                placeholder='Password'
                label='Password'
                type='password'
              />

              <Button
                type='submit'
                className='w-full'
              >
                Sign In
              </Button>
            </div>
            {globalError && (
              <p className='text-red-500 text-sm py-5 text-center'>{globalError.message}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
