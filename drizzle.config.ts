import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql', // Use "mysql2" as the dialect for MySQL
  schema: './src/database/schema.ts', // Path to your schema file
  out: './drizzle/migrations', // Output directory for migration files
  dbCredentials: {
    host: 'localhost',
    user: 'aryansinghthakur', // Update with your MySQL username
    password: '1234', // Update with your MySQL password
    database: 'test', // Update with your database name
  },
});
