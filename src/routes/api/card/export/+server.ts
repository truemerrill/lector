import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { userTable, flashcardTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

import AnkiExport from 'anki-apkg-export';


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
        .innerJoin(userTable, eq(userTable.id, flashcardTable.userId))
        .where(eq(userTable.email, session.user.email));

    const apkg = new AnkiExport.default('flashcards');
    for (const card of cards) {
        apkg.addCard(card.front, card.back);
    }

    const zip = await apkg.save();
    return new Response(zip, {
		status: 200,
		headers: {
			'Content-Type': 'application/zip',
			'Content-Disposition': 'attachment; filename="flashcards.apkg"'
		}
	});
}