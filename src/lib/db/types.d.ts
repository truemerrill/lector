import { InferSelectModel } from 'drizzle-orm';
import { userTable, flashcardTable } from './schema';

export type UserSettings = InferSelectModel<typeof userTable>;
export type Flashcard = InferSelectModel<typeof flashcardTable>;
