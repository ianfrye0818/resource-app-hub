'use server';

import { createServerAxios } from '@/api/serverAxios';
import { ApiRoutes } from '@/lib/api-routes';
import { BASE_API_URL } from '@/lib/constants';
import { ErrorMessages } from '@/lib/data';
import { AuthTokens, User } from '@/lib/types';
import { SignInFormValues } from '@/lib/zod-schemas';
import { cookies } from 'next/headers';

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

    // const response = await fetch(BASE_API_URL + ApiRoutes.auth.login, {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // if (!response.ok) {
    //   if (response.status === 401) {
    //     throw new Error(ErrorMessages.InvalidCredentials);
    //   }
    //   throw new Error(ErrorMessages.Unknown);
    // }

    const { accessToken, refreshToken, ...rest } = data;
    cookies().set('accessToken', accessToken);
    cookies().set('refreshToken', refreshToken);
    cookies().set('user', JSON.stringify(rest));
    return data;
  } catch (error) {
    console.error(['login'], error);
    throw error;
  }
}

// export async function refreshTokens() {
//   try {
//     const refreshToken = cookies().get('refreshToken')?.value;
//     if (!refreshToken) {
//       throw new Error(ErrorMessages.RefreshToken);
//     }

//     const resp = await fetch(BASE_API_URL + ApiRoutes.auth.refreshToken, {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${refreshToken}` },
//     });

//     if (!resp.ok) {
//       throw new Error(ErrorMessages.RefreshToken);
//     }
//     const data = (await resp.json()) as AuthTokens;

//     cookies().set('accessToken', data.accessToken);
//     cookies().set('refreshToken', data.refreshToken);
//   } catch (error) {
//     console.error(['refreshTokens'], error);
//     throw error;
//   }
// }

export async function logout() {
  try {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
    cookies().delete('user');
  } catch (error) {
    console.error(['logout'], error);
    throw error;
  }
}
