import type { User, CreateUserDto, UpdateUserDto } from '@features/users/types'
import { IUserRepository } from '.'

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

export const mockUserRepository = new MockUserRepository()