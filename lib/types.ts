export type LinkCardProps = {
  title: string;
  description?: string;
  linkIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize?: number;
  iconWidth?: number;
  href: string;
  newWindow?: boolean;
  iconColor?: string;
};

export enum Models {
  GEMINI = 'gemini',
  CLAUDE = 'claude',
  CHATGPT = 'chatgpt',
}

export type AIModelSelect = {
  label: string;
  value: Models;
};
export type User = {
  email: string;
  userId: string;
  role: Role;
  permissions: PermissionList[];
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'super_admin',
}

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export enum PermissionList {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GENERATE_RESUME,
  GENERATE_QR_CODE,
}

export type QRCode = {
  id: string;
  userId: string;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
};
