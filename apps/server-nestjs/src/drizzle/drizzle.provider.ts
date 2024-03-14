import * as postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'DRIZZLE_ASYNC_PROVIDER';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const client = postgres(process.env.DB_URL!);
      return drizzle(client, { schema });
    },
    exports: [DrizzleAsyncProvider],
  },
];
