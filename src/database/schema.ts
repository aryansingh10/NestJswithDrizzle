import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(), // New soft delete field
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
