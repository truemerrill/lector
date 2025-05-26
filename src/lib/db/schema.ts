import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
    id: serial().primaryKey(),
    email: text().notNull().unique(),
    name: text().notNull(),
    langNative: text(),
    langTarget: text(),
    langInterface: text()
});

export const flashcardTable = pgTable('flashcard', {
    id: serial().primaryKey(),
    userId: integer()
        .notNull()
        .references(() => userTable.id),
    front: text().notNull(),
    back: text().notNull()
});
