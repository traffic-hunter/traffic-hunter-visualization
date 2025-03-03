import { apiClient } from "@core/api/client"
import type { User, CreateUserDto, UpdateUserDto } from '@features/users/types'
import { IUserRepository } from '.'

export class UserRepository implements IUserRepository {
  private static instance: UserRepository
  private readonly baseUrl = '/users'

  private constructor() {}

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository()
    }
    return UserRepository.instance
  }

  async getUser(id: string): Promise<User> {
    return apiClient.get<User>(`${this.baseUrl}/${id}`)
  }

  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>(this.baseUrl)
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return apiClient.post<User>(this.baseUrl, data)
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return apiClient.post<User>(`${this.baseUrl}/${id}`, data)
  }

  async deleteUser(id: string): Promise<void> {
    return apiClient.client.delete(`${this.baseUrl}/${id}`)
  }
}

export const userRepository = UserRepository.getInstance()