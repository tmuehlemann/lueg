import 'dotenv/config'; // make sure to install dotenv package
import type { Config } from 'drizzle-kit';
import * as process from 'process';
export default {
  driver: 'pg',
  out: './drizzle',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;
