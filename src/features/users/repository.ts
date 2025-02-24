import { apiClient } from '../../api/client'
import type { User, CreateUserDto, UpdateUserDto } from './types'

export interface IUserRepository {
  getUser(id: string): Promise<User>
  getUsers(): Promise<User[]>
  createUser(data: CreateUserDto): Promise<User>
  updateUser(id: string, data: UpdateUserDto): Promise<User>
  deleteUser(id: string): Promise<void>
}

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

export class MockUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date().toISOString()
    }
  ]

  async getUser(id: string): Promise<User> {
    const user = this.users.find(u => u.id === id)
    if (!user) throw new Error('User not found')
    return user
  }

  async getUsers(): Promise<User[]> {
    return this.users
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: String(this.users.length + 1),
      ...data,
      createdAt: new Date().toISOString()
    }
    this.users.push(newUser)
    return newUser
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    
    this.users[index] = {
      ...this.users[index],
      ...data
    }
    return this.users[index]
  }

  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    this.users.splice(index, 1)
  }
}

export const userRepository = UserRepository.getInstance()
export const mockUserRepository = new MockUserRepository()