import { AxiosError, AxiosResponse } from 'axios';

interface CustomAPIErrorOptions {
  name: string;
  message: string;
  response?: AxiosResponse;
  status?: number;
  headers?: any;
}

export class APIError extends AxiosError {
  public readonly name: string = 'APIError';
  public readonly response: AxiosResponse | undefined;
  public readonly status: number | undefined;
  public readonly headers: any;
  public readonly message: string;

  constructor({ headers, name, response, status, message }: CustomAPIErrorOptions) {
    super(name, headers);
    this.name = 'APIError';
    this.response = response;
    this.status = status;
    this.headers = headers;
    this.message = response?.data?.message || message;
  }

  get JSON(): object {
    return {
      message: this.message,
      name: this.name,
      response: this.response
        ? {
            status: this.response.status,
            headers: this.response.headers,
            data: this.response.data,
          }
        : undefined,
      config: this.config,
      request: this.request,
      status: this.status,
      headers: this.headers,
    };
  }

  toString() {
    return `${this.name}: ${this.message}${this.status ? ` (status: ${this.status})` : ''}`;
  }

  static isAPIError(error: any): error is APIError {
    return error instanceof APIError;
  }

  static create(error: AxiosError): APIError {
    return new APIError({ name: 'APIError', message: error.message, response: error.response });
  }
}
