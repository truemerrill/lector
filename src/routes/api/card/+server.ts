import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { userTable, flashcardTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';


export const GET: RequestHandler = async (event) => {
    const session = await event.locals.auth();

    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    const cards = await db
        .select({
            front: flashcardTable.front,
            back: flashcardTable.back
        })
        .from(flashcardTable)
        .leftJoin(userTable, eq(userTable.id, flashcardTable.userId))
        .where(eq(userTable.email, session.user.email));

    return new Response(JSON.stringify(cards));
}


const CardSchema = z.object({
    front: z.string().min(1),
    back: z.string().min(1)
});


export const POST: RequestHandler = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    const [{ userId }] = await db.select({ userId: userTable.id }).from(userTable).where(eq(userTable.email, session.user.email)).limit(1);

    /* Validation */
    let data;
    try {
        data = CardSchema.parse(await event.request.json());
    } catch (err) {
        return new Response(null, { status: 400, statusText: 'Invalid request' });
    }

    const [ card ] = await db
        .insert(flashcardTable)
        .values({
            userId: userId,
            front: data.front,
            back: data.back
        })
        .returning();

    return new Response(JSON.stringify(card));
}


export const DELETE: RequestHandler = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    const [{ userId }] = await db.select({ userId: userTable.id }).from(userTable).where(eq(userTable.email, session.user.email)).limit(1);
    const cards = await db
        .delete(flashcardTable)
        .where(eq(flashcardTable.userId, userId))
        .returning();

    return new Response(JSON.stringify(cards));
}