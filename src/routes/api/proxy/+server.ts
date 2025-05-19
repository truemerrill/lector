import type { RequestHandler } from './$types';
import { z } from 'zod';

const ProxyGetSchema = z.object({
    url: z.string().url().nonempty()
});

/**
 * Proxy request to load a remote site.
 */
export const GET: RequestHandler = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user?.email) {
        return new Response(null, { status: 401, statusText: 'Unauthorized' });
    }

    /* Validation */
    const query = Object.fromEntries(event.url.searchParams.entries());
    const result = ProxyGetSchema.safeParse(query);

    if (!result.success) {
        return new Response(null, { status: 400, statusText: 'Invalid request' });
    }

    const { url } = result.data;

    /* Fetch remote data */
    try {
        const response = await fetch(url);

        if (!response.ok) {
            return new Response(null, { status: response.status, statusText: response.statusText });
        }
        const rawHtml = await response.text();

        /* Return the sanitized proxy data */
        return new Response(rawHtml, {
            headers: { 'Content-Type': 'text/html' }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            return new Response(null, { status: 404, statusText: 'Not found' });
        } else {
            return new Response(null, { status: 500, statusText: 'Internal error' });
        }
    }
};
