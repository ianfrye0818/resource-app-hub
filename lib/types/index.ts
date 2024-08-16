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

export type User = {
  email: string;
  userId: string;
  roles: RoleList;
  permissions: PermissionList[];
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export enum RoleList {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ECOLAB = 'ECOLAB',
}

export enum PermissionList {
  GET_USERS = 'GET_USERS',
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  GET_PERMISSIONS = 'GET_PERMISSIONS',
  CREATE_PERMISSION = 'CREATE_PERMISSION',
  UPDATE_PERMISSION = 'UPDATE_PERMISSION',
  DELETE_PERMISSION = 'DELETE_PERMISSION',
  GET_ROLES = 'GET_ROLES',
  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',
  GENERATE_RESUME = 'GENERATE_RESUME',
  GENERATE_QR_CODE = 'GENERATE_QR_CODE',
  GET_ECOLAB_ASSIGNMENTS = 'GET_ECOLAB_ASSIGNMENTS',
  CREATE_ECOLAB_ASSIGNMENTS = 'CREATE_ECOLAB_ASSIGNMENTS',
  UPDATE_ECOLAB_ASSIGNMENTS = 'UPDATE_ECOLAB_ASSIGNMENTS',
  DELETE_ECOLAB_ASSIGNMENTS = 'DELETE_ECOLAB_ASSIGNMENTS',
  GET_ECOLAB_EMPLOYEES = 'GET_ECOLAB_EMPLOYEES',
  CREATE_ECOLAB_EMPLOYEES = 'CREATE_ECOLAB_EMPLOYEES',
  UPDATE_ECOLAB_EMPLOYEES = 'UPDATE_ECOLAB_EMPLOYEES',
  DELETE_ECOLAB_EMPLOYEES = 'DELETE_ECOLAB_EMPLOYEES',
  GET_ECOLAB_MANAGERS = 'GET_ECOLAB_MANAGERS',
  CREATE_ECOLAB_MANAGERS = 'CREATE_ECOLAB_MANAGERS',
  UPDATE_ECOLAB_MANAGERS = 'UPDATE_ECOLAB_MANAGERS',
  DELETE_ECOLAB_MANAGERS = 'DELETE_ECOLAB_MANAGERS',
}
