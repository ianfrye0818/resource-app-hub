import { Models } from '@/lib/types/AI.types';
import { FilterEcolabAssignment, FilterEcolabManager } from '@/lib/types/ecolab.types';

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
  user: {
    getAllUsers: '/user',
    getUserById: (id: string) => `/user/${id}`,
    createUser: '/user',
    updateUser: (id: string) => `/user/${id}`,
    deleteUser: (id: string) => `/user/${id}`,
    importUsers: '/user/import',
    exportUsers: '/user/export',
    flipFirstLogin: (id: string) => `/user/${id}/flip-first-login-status`,
    updatePassword: (id: string) => `/user/${id}/update-password`,
    uploadAvatar: (id: string) => `/user/${id}/upload-avatar`,
    getUserImages: (id: string) => `/user/${id}/images`,
    restoreUser: (id: string) => `/user/${id}/restore`,
  },
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
  },
  permissions: {
    getUserPermissions: (id: string) => `/user/${id}/permissions/`,
    addPermissions: (id: string) => `/user/${id}/permissions/add`,
    removePermissions: (id: string) => `/user/${id}/permissions/remove`,
  },
  QRCode: {
    getAllCodes: '/qr-code',
    getCodeById: (id: string) => `/qr-code/${id}`,
    createCode: '/qr-code',
    deleteCode: (id: string) => `/qr-code/${id}`,
  },
  ecolab: {
    employee: {
      getAllEmployees: '/ecolab-employee',
      getSingleEmployee: (id: string) => `/ecolab-employee/${id}`,
      createEmployee: '/ecolab-employee',
      updateEmployee: (id: string) => `/ecolab-employee/${id}`,
      deleteEmployee: (id: string) => `/ecolab-employee/${id}`,
    },
    manager: {
      getAllManagers: (query?: FilterEcolabManager) => `/ecolab-manager?${combineQuery(query)}`,
      getSingleManager: (id: string) => `/ecolab-manager/${id}`,
      createManager: '/ecolab-manager',
      updateManager: (id: string) => `/ecolab-manager/${id}`,
      deleteManager: (id: string) => `/ecolab-manager/${id}`,
    },
    assignment: {
      getAllAssignments: (query?: FilterEcolabAssignment) =>
        `/ecolab-assignment?${combineQuery(query)}`,
      getSingleAssignment: (id: string) => `/ecolab-assignment/${id}`,
      createAssignment: '/ecolab-assignment',
      updateAssignment: (id: string) => `/ecolab-assignment/${id}`,
      deleteAssignment: (id: string) => `/ecolab-assignment/${id}`,
    },
  },
};

export const combineQuery = (query: any) => {
  if (!query) return '';
  const queryArray = Object.entries(query).map(([key, value]) => {
    return `${key}=${value}`;
  });
  return queryArray.join('&');
};
