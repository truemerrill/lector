import type { Flashcard } from '$lib/types';

export async function create(front: string, back: string): Promise<Flashcard> {
    const url = new URL('/api/card', location.origin);
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            front: front,
            back: back
        }),
        headers: { 'Content-Type': 'application/json ' }
    });

    const card = await res.json();
    return card;
}

export async function clear(): Promise<Flashcard[]> {
    const url = new URL('/api/card', location.origin);
    const res = await fetch(url, {
        method: 'DELETE'
    });
    const cards = await res.json();
    return cards;
}

export async function save() {
    const url = new URL('/api/card/export', location.origin);
    const res = await fetch(url);
    const blob = await res.blob();

    // Save binary as a file on the client side
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = 'flashcards.apkg';
    a.click();
    URL.revokeObjectURL(blobURL);
}
