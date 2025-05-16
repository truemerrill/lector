import { InferSelectModel } from 'drizzle-orm';
import { userTable } from './schema';

export type UserSettings = InferSelectModel<typeof userTable>;
