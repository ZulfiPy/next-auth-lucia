import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const connectionString = process.env.DATABASE_URL as string;

export const usersTable = pgTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull()
});

export const sessionsTable = pgTable('session', {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: "date" }).notNull(),
    userId: text('user_id').references(() => usersTable.id).notNull()
});

export const client = postgres(connectionString);

export const db = drizzle(client);

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export interface DatabaseUser {
    id: string;
    username: string;
    password: string;
}