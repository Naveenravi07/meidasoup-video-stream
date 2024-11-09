import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull(),
  pwd: varchar({ length: 60 }).notNull(),
  email: varchar({ length: 40 }).notNull().unique(),
  phone: varchar({ length: 12 }).notNull(),
});
