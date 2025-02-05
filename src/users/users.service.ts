import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import * as schema from '../database/schema';
import { users, NewUser, User } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DRIZZLE_PROVIDER')
    private db: MySql2Database<typeof schema>,
  ) {}

  async create(data: NewUser): Promise<User> {
    const createdAt = new Date();
    const [result] = await this.db.insert(users).values({
      ...data,
      createdAt,
      isDeleted: false,
    });
    return {
      id: Number(result.insertId),
      ...data,
      createdAt,
      isDeleted: false,
    };
  }

  async findAll(): Promise<User[]> {
    return this.db.select().from(users);
  }

  async findOne(id: number): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user ?? null;
  }

  async deleteOne(id: number): Promise<string> {
    const userToDelete = await this.findOne(id);
    if (!userToDelete) {
      return 'User not found';
    }
    await this.db.delete(users).where(eq(users.id, id));
    return `User with this ${id} is Deleted`;
  }

  async updateOne(id: number, updateData: Partial<NewUser>): Promise<string> {
    const userToUpdate = await this.findOne(id);
    if (!userToUpdate) {
      return 'User not found';
    }

    await this.db.update(users).set(updateData).where(eq(users.id, id));
    return `User with ID ${id} has been updated`;
  }

  async softDelete(id: number): Promise<string> {
    const userToDelete = await this.findOne(id);
    if (!userToDelete) {
      return 'User not found';
    }
    if (userToDelete.isDeleted === true) {
      return `User Not exist`;
    }

    await this.db
      .update(users)
      .set({ isDeleted: true })
      .where(eq(users.id, id));
    return 'User Soft deleted Successfully';
  }
}
