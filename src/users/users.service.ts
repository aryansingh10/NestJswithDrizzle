import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2/driver';
import * as schema from '../database/schema';
import { users, NewUser, User } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DRIZZLE_PROVIDER')
    private drizzle: MySql2Database<typeof schema>,
  ) {}

  async create(data: NewUser): Promise<User> {
    const [result] = await this.drizzle.insert(users).values({
      ...data,
      createdAt: new Date(),
    });
    return {
      id: Number(result.insertId),
      ...data,
      createdAt: new Date(),
    };
  }

  async findAll(): Promise<User[]> {
    return this.drizzle.select().from(users);
  }

  async findOne(id: number): Promise<User> {
    const [user] = await this.drizzle
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }
}
