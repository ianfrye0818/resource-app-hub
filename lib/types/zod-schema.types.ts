import { z } from 'zod';
import {
  CreateEcolabAssignmentSchema,
  CreateEcolabEmployeeSchema,
  CreateEcolabManagaerSchema,
  CreatePermissionSchema,
  CreateQRCodeSchema,
  CreateUserSchema,
  SignInFormSchema,
  UpdateEcoblabEmployeeSchema,
  UpdateEcolabAssignmentSchema,
  UpdateEcolabManagaerSchema,
  UpdatePermissionsSchema,
  UpdateUserSchema,
} from '../zod-schemas';

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export type CreateEcolabManagaerSchemaValues = z.infer<typeof CreateEcolabManagaerSchema>;
export type UpdateEcolabManagaerSchemaValues = z.infer<typeof UpdateEcolabManagaerSchema>;
export type CreateEcolabEmployeeSchemaValues = z.infer<typeof CreateEcolabEmployeeSchema>;
export type UpdateEcoblabEmployeeSchemaValues = z.infer<typeof UpdateEcoblabEmployeeSchema>;
export type CreateEcolabAssignmentSchemaValues = z.infer<typeof CreateEcolabAssignmentSchema>;
export type UpdateEcolabAssignmentSchemaValues = z.infer<typeof UpdateEcolabAssignmentSchema>;
export type CreateUserSchemaValues = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaValues = z.infer<typeof UpdateUserSchema>;
export type CreateQRCodeSchemaValues = z.infer<typeof CreateQRCodeSchema>;
export type CreatePermissionSchemaValues = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionsSchemaValues = z.infer<typeof UpdatePermissionsSchema>;
