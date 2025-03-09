import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config } from '../config/env'
import { handleHttpError } from '../error/handlers/httpErrorHandler'

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
      handleHttpError
    )
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