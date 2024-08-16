export enum EcolabLocations {
  WINSTON_SALEM = 'WINSTON_SALEM',
  GREENSBORO = 'GREENSBORO',
}

export enum EcolabTerminationReason {
  TERMINATED_PERFORMANCE = 'TERMINATED_PERFORMANCE',
  TERMINATED_POLICY_VIOLATION = 'TERMINATED_POLICY_VIOLATION',
  TERMINATED_ATTENDANCE = 'TERMINATED_ATTENDANCE',
  TERMINATED_OTHER = 'TERMINATED_OTHER',
  QUIT_NOT_ELIGIBLE_FOR_REHIRE = 'QUIT_NOT_ELIGIBLE_FOR_REHIRE',
  QUIT_ELIGIBLE_FOR_REHIRE = 'QUIT_ELIGIBLE_FOR_REHIRE',
  HIRED_PERM = 'HIRED_PERM',
  PROJECT_COMPLETE = 'PROJECT_COMPLETE',
  ASSIGNMENT_COMPLETE = 'ASSIGNMENT_COMPLETE',
  OVER_ONE_YEAR_ASSIGNMENT = 'OVER_ONE_YEAR_ASSIGNMENT',
}

export enum EcolabPosition {
  FORKLIFT_1 = 'FORKLIFT_1',
  GENERAL_LABOR_1 = 'GENERAL_LABOR_1',
  ASSEMBLER_1 = 'ASSEMBLER_1',
  WAREHOUSE_1 = 'WAREHOUSE_1',
}

export enum EcolabShift {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
}

export type EcolabEmployee = {
  bullhornId: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignments: EcolabAssignment[];
};

export type EcolabAssignment = {
  beelineRequestId: string;
  startDate: Date;
  dtCompletedDate: Date;
  backgroundCompletedDate: Date;
  educationVerified: boolean;
  endDate?: Date;
  position: EcolabPosition;
  shift: EcolabShift;
  location: EcolabLocations;
  payRate: number;
  ctsUserId: string;
  terminationReason?: EcolabTerminationReason;
  terminationNotes?: string;
  ctsUser: EcolabManager;
  employees: EcolabEmployee[];
};

export type EcolabManager = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  location: EcolabLocations;
  assignments: EcolabAssignment[];
};

export type FilterEcolabManager = {
  location?: string;
};

export type FilterEcolabAssignment = {
  location?: string;
  position?: string;
  shift?: string;
};
