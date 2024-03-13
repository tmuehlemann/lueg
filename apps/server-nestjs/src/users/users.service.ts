import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: '$2b$10$EDhcwZm9jx2.8GBAS8pX2ufO2PfH7Nyh1kI.kzIo.qFdkGBqgIBQa', // password is: changeme
    },
    {
      userId: 2,
      username: 'maria',
      password: '$2b$10$TxM.j83SVJhdMrC.K9PEke1ZKdRMjydC0U1hTzWB30JukMdB.fFcu', // password is: guess
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
