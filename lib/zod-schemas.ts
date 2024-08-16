import { string, z } from 'zod';
import { PermissionList, RoleList } from './types';
import { Models } from './types/AI.types';
import {
  EcolabLocations,
  EcolabPosition,
  EcolabShift,
  EcolabTerminationReason,
} from './types/ecolab.types';

//auth
export const SignInFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

//AI
export const SelectModelSchema = z.object({
  model: z.nativeEnum(Models),
});

//User
export const CreateUserSchema = z.object({
  firstName: z.string().min(2, 'Please provide a valid first name'),
  lastName: z.string().min(2, 'Please provide a valid last name'),
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roles: z.array(z.nativeEnum(RoleList)).optional(),
  isActive: z.boolean().optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial().extend({
  deletedAt: z.date().optional(),
  firstLogin: z.boolean().optional(),
  avatarUrl: z.string().optional(),
});

//ecolab
export const CreateEcolabManagaerSchema = z.object({
  firstName: z.string().min(2, 'Please provide a valid first name'),
  lastName: z.string().min(2, 'Please provide a valid last name'),
  email: z.string().email('Please provide a valid email'),
  phone: z.string().min(10, 'Please provide a valid phone number').optional(),
  location: z.nativeEnum(EcolabLocations),
});
export const UpdateEcolabManagaerSchema = CreateEcolabManagaerSchema.partial();

export const CreateEcolabEmployeeSchema = z.object({
  bullhornId: z
    .string()
    .regex(/^\d+$/, 'Please provide a valid Bullhorn ID')
    .min(6, 'Please provide a valid Bullhorn ID')
    .max(6, 'Please provide a valid Bullhorn ID'),
  firstName: z.string().min(2, 'Please provide a valid first name'),
  lastName: z.string().min(2, 'Please provide a valid last name'),
  birthDate: z.date(),
});
export const UpdateEcoblabEmployeeSchema = CreateEcolabEmployeeSchema.partial();

export const CreateEcolabAssignmentSchema = z.object({
  beelineRequestId: z.string().regex(/^\d{5}-\d{1}$/, 'Please provide a valid Beeline Request ID'),
  startDate: z.date(),
  dtCompletedDate: z.date(),
  backgroundCompletedDate: z.date(),
  educationVerified: z.boolean(),
  position: z.nativeEnum(EcolabPosition),
  shift: z.nativeEnum(EcolabShift),
  payrate: z.number().min(0, 'Please provide a valid payrate'),
  ctsUserId: z.string().min(2, 'Please provide a valid CTS User ID'),
});

export const UpdateEcolabAssignmentSchema = CreateEcolabAssignmentSchema.partial().extend({
  endDate: z.date().optional(),
  terminationReason: z.nativeEnum(EcolabTerminationReason).optional(),
  terminationNotes: z.string().optional(),
});

//QRCodes
export const CreateQRCodeSchema = z.object({
  qrCode: z.string().min(6, 'Please provide a valid QR Code'),
  userId: z.string().min(6, 'Please provide a valid User ID'),
});

//Permissions
export const CreatePermissionSchema = z.object({
  userId: string().min(6, 'Please provide a valid User ID'),
  permissions: z.array(z.nativeEnum(PermissionList)),
});

export const UpdatePermissionsSchema = CreatePermissionSchema;
