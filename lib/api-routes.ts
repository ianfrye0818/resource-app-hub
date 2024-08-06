import { Models } from './types';

export const ApiRoutes = {
  resumeParser: {
    generateFormattedResume: (type: Models) =>
      `/resume-parser/generate-formatted-resume?type=${type}`,
  },
  qrCodes: {
    getAllCodes: '/qr-code',
    getSingleCode: (id: string) => `/qr-code/${id}`,
    createCode: '/qr-code',
    deleteCode: (id: string) => `/qr-code/${id}`,
  },
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
  },
};
