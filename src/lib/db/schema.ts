import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull().unique(),
    name: text().notNull(),
    langNative: text(),
    langTarget: text(),
    langInterface: text()
});


export const flashcardTable = sqliteTable('flashcard', {
    id: int().primaryKey({ autoIncrement: true }),
    userId: int().notNull().references(() => userTable.id),
    front: text().notNull(),
    back: text().notNull()
});
