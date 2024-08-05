import { Models } from './types';

export const ApiRoutes = {
  resumeParser: {
    generateFormattedResume: (type: Models) =>
      `/resume-parser/generate-formatted-resume?type=${type}`,
  },
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
  },
};
