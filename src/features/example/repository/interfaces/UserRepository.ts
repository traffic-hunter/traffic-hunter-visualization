import type { User, CreateUserDto, UpdateUserDto } from '@features/example/types'

export interface IUserRepository {
  getUser(id: string): Promise<User>
  getUsers(): Promise<User[]>
  createUser(data: CreateUserDto): Promise<User>
  updateUser(id: string, data: UpdateUserDto): Promise<User>
  deleteUser(id: string): Promise<void>
}