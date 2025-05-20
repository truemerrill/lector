export type Tool = 'translate' | 'dictionary' | 'flashcard' | 'account';

export type Language = 'en' | 'es' | 'eo';

/**
 * The browser state
 */
export interface Browser {
    content?: HTMLElement;
    urlString?: string
    history: string[];
    index: number | null;
    status: number;
    error?: Error;
}

