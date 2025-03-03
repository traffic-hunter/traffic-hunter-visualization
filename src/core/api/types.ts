export interface ValidationErrorDetail {
  field: string;
  message: string;
  rejectedValue?: unknown;
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  validationErrors?: ValidationErrorDetail[];
}

export class CustomApiError extends Error {
  constructor(
    public status: number,
    public detail: string,
    public type: string = 'about:blank',
    public instance: string = '',
    public validationErrors?: ValidationErrorDetail[]
  ) {
    super(detail);
    this.name = 'CustomApiError';
  }

  public get isValidationError(): boolean {
    return this.status === 400 && this.validationErrors !== undefined;
  }

  public getFieldError(fieldName: string): ValidationErrorDetail | undefined {
    return this.validationErrors?.find(error => error.field === fieldName);
  }
}