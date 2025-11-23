import { pgTable, text, timestamp, varchar, char, integer, customType } from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
	dataType() {
		return 'bytea';
	}
});

export const user = pgTable('user', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	username: varchar({ length: 32 }).notNull(),
	salt: bytea().notNull(),
	password: varchar({ length: 255 }).notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
