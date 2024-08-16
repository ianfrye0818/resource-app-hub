'use server';
import { createServerAxios } from '@/api/serverAxios';
import { ApiRoutes } from '@/api/api-routes';
import { BASE_API_URL } from '@/lib/constants';
import { ErrorMessages } from '@/lib/data';
import { AuthTokens, User } from '@/lib/types';
import { cookies } from 'next/headers';
import { CustomError } from '@/lib/CustomError';
import { SignInFormValues } from '@/lib/types/zod-schema.types';

export async function getCurrentUser() {
  const user = cookies().get('user')?.value;
  if (!user) return null;
  return JSON.parse(user) as User;
}

export async function login(payload: SignInFormValues) {
  const cookieStore = cookies();
  const serverAxios = createServerAxios(cookieStore);
  try {
    const { data } = await serverAxios.post<User & AuthTokens>(
      BASE_API_URL + ApiRoutes.auth.login,
      payload
    );
    const { accessToken, refreshToken, ...rest } = data;
    if (data.firstName) {
      await flipFirstTime(data.userId);
    }
    cookies().set('accessToken', accessToken);
    cookies().set('refreshToken', refreshToken);
    cookies().set('user', JSON.stringify(rest));

    return data;
  } catch (error) {
    console.error(['login'], error);
    throw CustomError.create((error as any) || ErrorMessages.Unknown);
  }
}

export async function flipFirstTime(userId: string) {
  try {
    const serverAxios = createServerAxios(cookies());
    await serverAxios.patch(ApiRoutes.user.flipFirstLogin(userId));
  } catch (error) {
    console.error(['flipFirstTime'], error);
    throw error;
  }
}

export async function logout() {
  try {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
    cookies().delete('user');
  } catch (error) {
    console.error(['logout'], error);
    throw CustomError.create((error as any) || ErrorMessages.Unknown);
  }
}
