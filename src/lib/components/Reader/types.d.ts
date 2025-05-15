export type Tool = 'documents' | 'read' | 'translate' | 'dictionary' | 'flashcard' | 'account';

export type Language = 'en' | 'es' | 'eo';

export interface Settings {
    targetLanguage: Language;
    interfaceLanguage: Language;
}