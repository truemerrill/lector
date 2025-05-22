import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { LanguageEnum } from '$lib/lang';
import { userTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const GET: RequestHandler = async (event) => {
    const session = await event.locals.auth();

    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    const [user] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, session.user.email))
        .limit(1);

    if (!user) {
        return new Response(null, { status: 404, statusText: 'Not found' });
    } else {
        return new Response(JSON.stringify(user));
    }
};

const UserUpsertSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    langNative: LanguageEnum.optional(),
    langTarget: LanguageEnum.optional(),
    langInterface: LanguageEnum.optional()
});

export const POST: RequestHandler = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    /* Validation */
    let data;
    try {
        data = UserUpsertSchema.parse(await event.request.json());
    } catch (err) {
        return new Response(null, { status: 400, statusText: 'Invalid request' });
    }

    /* A user can only update their own profile */
    if (data.email !== session.user.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    const { email } = data;
    const [user] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

    if (!user) {
        const [newUser] = await db.insert(userTable).values(data).returning();
        return new Response(JSON.stringify(newUser));
    } else {
        const [updatedUser] = await db
            .update(userTable)
            .set(data)
            .where(eq(userTable.email, email))
            .returning();
        return new Response(JSON.stringify(updatedUser));
    }
};
