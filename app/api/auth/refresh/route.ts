import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AuthTokens } from '@/lib/types';
import { cookies } from 'next/headers';
import { BASE_API_URL } from '@/lib/constants';
import { ApiRoutes } from '@/api/api-routes';

export async function POST(request: NextRequest) {
  try {
    const refreshToken =
      cookies().get('refreshToken')?.value ||
      request.cookies.get('accessToken') ||
      (await request.json().then((body) => body.refreshToken));
    const { data } = await axios.post<AuthTokens>(
      BASE_API_URL + ApiRoutes.auth.refreshToken,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    );

    const { accessToken, refreshToken: newRefreshToken } = data;

    const res = NextResponse.json({ accessToken, refreshToken: newRefreshToken });
    cookies().set('accessToken', accessToken, { httpOnly: true, path: '/', maxAge: 3600 });
    cookies().set('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 3600 * 24 * 30,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Failed to refresh token' }, { status: 418 });
  }
}
