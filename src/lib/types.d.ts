export type Tool = 'translate' | 'dictionary' | 'flashcard' | 'account';

export type Language = 'en' | 'es' | 'eo';

/**
 * The browser state
 */
export interface Browser {
    content?: HTMLElement;
    selection?: string;
    urlString?: string;
    history: string[];
    index: number | null;
    status: number;
    error?: Error;
}

export interface Translation {
    translatedText: string,
    alternatives?: string[]
}

export type Translator = (text: string, source: Language, target: Language) => Promise<Translation>;

export interface Flashcard {
    front: string;
    back: string;
}
