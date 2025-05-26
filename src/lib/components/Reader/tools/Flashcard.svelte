<script lang="ts">
    import type { Browser } from '$lib/types';
    import type { UserSettings } from '$lib/db/types';
    import { _ } from 'svelte-i18n';
    import { libreTranslate } from '$lib/translate';
    import { create, clear, save } from '$lib/flashcard';
    import { toaster } from '../toaster';

    let {
        userSettings,
        browser
    }: {
        userSettings: UserSettings;
        browser: Browser;
    } = $props();

    let text = $state<string>(browser.selection ? browser.selection : '');
    let translation = $state<string>('');

    const { langTarget, langNative } = userSettings;

    async function handleTranslate(event: MouseEvent): Promise<void> {
        const source = langTarget || 'en';
        const target = langNative || 'en';
        const t = await libreTranslate(text, source, target);
        translation = t.translatedText;
    }

    async function handleSave(event: MouseEvent): Promise<void> {
        await create(text, translation);
        text = '';
        translation = '';
        toaster.info({
            title: $_('created_a_flashcard')
        });
    }

    async function handleExport(event: MouseEvent): Promise<void> {
        await save();
    }

    async function handleClear(event: MouseEvent): Promise<void> {
        const deleted = await clear();
        toaster.info({
            title: `${$_('deleted')} ${deleted.length} ${$_('flashcards')}`
        });
    }
</script>

<div class="flex h-full flex-col p-6">
    <div class="mb-3">
        <h3 class="h3">{$_('flashcard')}</h3>
    </div>

    <div class="flex-1 overflow-y-auto">
        <div>
            <p>{$_('create_a_flashcard')}</p>
        </div>
        <form class="max-w mt-4 space-y-4">
            <label class="label">
                <span class="label-text">{$_('front')}</span>
                <textarea class="textarea" rows="5" bind:value={text}></textarea>
            </label>
            <label class="label">
                <span class="label-text">{$_('back')}</span>
                <textarea class="textarea" rows="5" bind:value={translation}></textarea>
            </label>
            {#if text !== ''}
                {#if translation === ''}
                    <button
                        type="button"
                        class="btn preset-filled-primary-500"
                        onclick={handleTranslate}
                        aria-label="logout"
                    >
                        {$_('translate_text')}
                    </button>
                {:else}
                    <button
                        type="button"
                        class="btn preset-filled-primary-500"
                        onclick={handleSave}
                        aria-label="logout"
                    >
                        {$_('save_card')}
                    </button>
                {/if}
            {/if}
        </form>
    </div>

    <div>
        <hr class="hr mt-4 mb-4" />
        <button type="button" class="btn preset-filled-primary-500" onclick={handleExport} aria-label="logout">
            {$_('export_to_anki')}
        </button>
        <button
            type="button"
            class="btn preset-tonal-secondary"
            onclick={handleClear}
            aria-label="logout"
        >
            {$_('delete_all_flashcards')}
        </button>
    </div>
</div>
