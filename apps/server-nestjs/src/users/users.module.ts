import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DrizzleModule],
})
export class UsersModule {}
