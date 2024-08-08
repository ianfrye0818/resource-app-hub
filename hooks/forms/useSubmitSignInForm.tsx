'use client';
import { SignInFormValues } from '@/lib/zod-schemas';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { useAuth } from '../useAuth';
import { login } from '@/actions/auth-actions';
import { ActionType } from '@/contexts/AuthProvider';
import { isCustomError, isError } from '@/lib/errors';

export default function useSubmitSignInForm({
  form,
  redirectURL,
}: {
  form: UseFormReturn<SignInFormValues>;
  redirectURL: string;
}) {
  const router = useRouter();

  const { dispatch } = useAuth();
  async function onSubmit(data: SignInFormValues) {
    try {
      dispatch({ type: ActionType.LOGIN_REQUEST });
      const response = await login(data);

      const { accessToken, refreshToken, ...user } = response;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { user } });
      router.push(redirectURL);
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
