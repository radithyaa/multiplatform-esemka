import {defineConfig} from 'drizzle-kit'
export default defineConfig({
  out: './src/lib/db/drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true
});