import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MetadataApisModule } from './metadata-apis/metadata-apis.module';
import { MediaLibraryModule } from './media-library/media-library.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MoviesModule,
    ServeStaticModule.forRoot({
      rootPath: 'static',
      serveRoot: '/static',
    }),
    MetadataApisModule,
    MediaLibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
