import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

export class ApiClient {
  private static instance: ApiClient
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
      timeout: 30000,
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
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
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

  public async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data)
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