export type Tool = 'translate' | 'dictionary' | 'flashcard' | 'account';

export type Language = 'en' | 'es' | 'eo';

/**
 * The user settings
 */
// export interface Settings {
//     targetLanguage: Language;
//     interfaceLanguage: Language;
// }


/**
 * The browser state
 */
export interface Browser {
    content: HTMLElement | undefined;
    history: URL[];
    index: number | null;
    showAddressBar: boolean;
}

