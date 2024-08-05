'use client';
import { SignInFormValues } from '@/lib/zod-schemas';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { useAuth } from '../useAuth';
import { useSearchParams } from 'next/navigation';
import { login } from '@/actions/auth-actions';
import { ActionType } from '@/contexts/AuthProvider';
import { isCustomError, isError } from '@/lib/errors';

export default function useSubmitSignInForm({ form }: { form: UseFormReturn<SignInFormValues> }) {
  const router = useRouter();
  const { dispatch } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');
  async function onSubmit(data: SignInFormValues) {
    try {
      dispatch({ type: ActionType.LOGIN_REQUEST });
      const user = await login(data);

      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { user } });
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch (error) {
      console.error(['signInFormError'], error);
      dispatch({ type: ActionType.LOGIN_FAILURE });
      form.setError('root', {
        message: isCustomError(error) || isError(error) ? error.message : 'Error signing in',
      });
    }
  }
  return onSubmit;
}
