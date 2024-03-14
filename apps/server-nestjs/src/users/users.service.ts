import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export type UserDto = {
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(userDto: UserDto) {
    const user = await this.findOne(userDto.username);

    if (user) {
      throw new ConflictException('username not unique');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);

    const newUsers = await this.db
      .insert(schema.users)
      .values({
        ...userDto,
        password: hashedPassword,
      })
      .returning();

    const { password, ...result } = newUsers[0];

    return result;
  }

  async findOne(username: string): Promise<Record<string, any> | undefined> {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });

    return user;
  }
}
