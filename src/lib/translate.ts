import type { Translation } from '$lib/types';

export async function libreTranslate(
    text: string,
    source: string,
    target: string
): Promise<Translation> {
    const url = new URL('/api/translate/libre', location.origin);
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            q: text,
            source: source,
            target: target,
            format: 'text',
            alternatives: 3
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    const translation = await res.json();
    return translation;
}
