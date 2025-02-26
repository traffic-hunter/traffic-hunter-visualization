import type { User, CreateUserDto, UpdateUserDto } from '@features/users/types'

export interface IUserRepository {
  getUser(id: string): Promise<User>
  getUsers(): Promise<User[]>
  createUser(data: CreateUserDto): Promise<User>
  updateUser(id: string, data: UpdateUserDto): Promise<User>
  deleteUser(id: string): Promise<void>
}

export * from './userRepository'
export * from './mockRepository'