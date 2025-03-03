import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import { config } from '../config/env'

export class ApiClient {
  private static instance: ApiClient
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.api.url,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (axiosConfig: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(config.auth.tokenKey)
        if (token) {
          axiosConfig.headers.Authorization = `Bearer ${token}`
        }
        return axiosConfig
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.error('Unauthorized access')
        }
        return Promise.reject(error)
      }
    )
  }

  public get client(): AxiosInstance {
    return this.axiosInstance
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url)
    return response.data
  }

  public async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data)
    return response.data
  }

  public async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config)
    return response.data
  }

  public async patch<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data)
    return response.data
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url)
    return response.data
  }
}

export const apiClient = ApiClient.getInstance()