import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull().unique(),
    name: text().notNull(),
    langTarget: text(),
    langInterface: text(),
});