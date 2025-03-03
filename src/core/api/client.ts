import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { config } from '../config/env'
import { ApiError, CustomApiError, ValidationErrorDetail } from './types'
import { HTTP_ERROR_MESSAGES } from './constants'

export class ApiClient {
  private static instance: ApiClient
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.api.url,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (!error.response) {
          return Promise.reject(this.createNetworkError())
        }

        const { status, data } = error.response
        
        if (status === 400 && data?.detail) {
          const validationErrors = this.parseValidationErrors(data.detail)
          return Promise.reject(this.createHttpError(status, data, validationErrors))
        }
        
        return Promise.reject(this.createHttpError(status, data))
      }
    )
  }

  private createNetworkError(): CustomApiError {
    return new CustomApiError(
      500,
      HTTP_ERROR_MESSAGES.NETWORK
    )
  }

  private parseValidationErrors(detail: string): ValidationErrorDetail[] {
    const fieldErrorRegex = /Field error in object '([^']+)' on field '([^']+)': rejected value \[([^\]]+)\];.*default message \[([^\]]+)\]/;
    const match = detail.match(fieldErrorRegex);
    
    if (match) {
      const [, , field, rejectedValue, message] = match;
      return [{
        field,
        message,
        rejectedValue
      }];
    }
    
    return [];
  }

  private createHttpError(
    status: number,
    data?: ApiError,
    validationErrors?: ValidationErrorDetail[]
  ): CustomApiError {
    if (status === 401) {
      const currentPath = window.location.pathname;
      window.location.href = `/members/login?redirect=${encodeURIComponent(currentPath)}`;
    }

    return new CustomApiError(
      status,
      validationErrors?.length
        ? `Validation failed: ${validationErrors.map(e => `${e.field} - ${e.message}`).join(', ')}`
        : HTTP_ERROR_MESSAGES[this.getErrorMessageKey(status)],
      data?.type,
      data?.instance,
      validationErrors
    )
  }

  private getErrorMessageKey(status: number): keyof typeof HTTP_ERROR_MESSAGES {
    switch (status) {
      case 400: return 'BAD_REQUEST'
      case 401: return 'UNAUTHORIZED'
      case 403: return 'FORBIDDEN'
      case 404: return 'NOT_FOUND'
      case 500: return 'INTERNAL_SERVER'
      default: return 'DEFAULT'
    }
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private createAuthConfig(config: AxiosRequestConfig = {}): AxiosRequestConfig {
    return {
      ...config,
      withCredentials: true
    }
  }

  private async request<T>({
    method,
    url,
    data,
    config = {},
    withAuth = false
  }: {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete'
    url: string
    data?: unknown
    config?: AxiosRequestConfig
    withAuth?: boolean
  }): Promise<T> {
    const finalConfig = withAuth ? this.createAuthConfig(config) : config
    
    const response = await (method === 'get' || method === 'delete'
      ? this.axiosInstance[method]<T>(url, finalConfig)
      : this.axiosInstance[method]<T>(url, data, finalConfig))

    return response.data
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'get', url, config })
  }

  public async getWithAuth<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'get', url, config, withAuth: true })
  }

  public async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'post', url, data, config })
  }

  public async postWithAuth<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'post', url, data, config, withAuth: true })
  }

  public async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'put', url, data, config })
  }

  public async putWithAuth<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'put', url, data, config, withAuth: true })
  }

  public async patch<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'patch', url, data, config })
  }

  public async patchWithAuth<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'patch', url, data, config, withAuth: true })
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'delete', url, config })
  }

  public async deleteWithAuth<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ method: 'delete', url, config, withAuth: true })
  }
}

export const apiClient = ApiClient.getInstance()