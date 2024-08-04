export class CustomError extends Error {
  status?: number;
  stack?: string;

  constructor(message?: string, status?: number) {
    super(message);
    this.status = status;
    this.stack = new Error().stack;
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

export function isCustomError(error: any): error is CustomError {
  return error instanceof CustomError;
}
export function isError(error: any) {
  return error instanceof Error;
}
