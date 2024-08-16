interface CustomErrorOptions {
  message: string;
  code?: number;
  status?: number;
  details?: object;
  requestId?: string;
  path?: string;
  user?: string;
  originalError?: Error;
  timestamp?: Date;
}

export class CustomError extends Error {
  public readonly name: string = 'CustomError';
  public readonly code: number | undefined;
  public readonly status: number | undefined;
  public readonly details: object | undefined;
  public readonly timestamp: Date = new Date();
  public readonly requestId: string | undefined;
  public readonly path: string | undefined;
  public readonly user: string | undefined;
  public readonly originalError: Error | undefined;

  constructor({
    message,
    code,
    status,
    details,
    originalError,
    path,
    requestId,
    user,
  }: CustomErrorOptions) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.originalError = originalError;
    this.path = path;
    this.requestId = requestId;
    this.user = user;
  }

  toJSON() {
    return {
      message: this.message,
      name: this.name,
      code: this.code,
      status: this.status,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
      requestId: this.requestId,
      path: this.path,
      user: this.user,
      originalError: this.originalError
        ? {
            message: this.originalError.message,
            stack: this.originalError.stack,
          }
        : undefined,
    };
  }

  toString() {
    return `${this.name}: ${this.message}${this.code ? ` (code: ${this.code})` : ''}${
      this.status ? ` (status: ${this.status})` : ''
    }`;
  }

  static isCustomError(error: any): error is CustomError {
    return error instanceof CustomError;
  }

  static create(message: string, options?: CustomErrorOptions) {
    return new CustomError({
      message,
      ...options,
      timestamp: new Date(),
    });
  }
}
