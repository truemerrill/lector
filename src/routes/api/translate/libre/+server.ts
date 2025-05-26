import type { RequestHandler } from './$types';
import { LanguageEnum } from '$lib/lang';
import { env } from '$env/dynamic/private';
import { z } from 'zod';

const Format = z.enum(['text', 'html']);

const TranslateSchema = z.object({
    q: z.string().nonempty(),
    source: LanguageEnum,
    target: LanguageEnum,
    format: Format.optional(),
    alternatives: z.number().int().nonnegative().optional()
});

export const POST: RequestHandler = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    let data;
    try {
        data = TranslateSchema.parse(await event.request.json());
    } catch (err) {
        return new Response(null, { status: 400, statusText: 'Invalid request' });
    }

    const res = await fetch(`${env.LIBRE_TRANSLATE_URL}/translate`, {
        method: 'POST',
        body: JSON.stringify({
            ...data,
            api_key: env.LIBRE_TRANSLATE_API_KEY
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        console.error({ status: res.status, statusText: res.statusText });
        return new Response(null, { status: res.status, statusText: res.statusText });
    } else {
        const result = await res.json();
        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
