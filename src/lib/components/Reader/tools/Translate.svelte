<script lang="ts">
    import type { Browser } from '$lib/types';
    import type { UserSettings } from '$lib/db/types';
    import { _ } from 'svelte-i18n';
    import { libreTranslate } from '$lib/translate';

    let {
        userSettings,
        browser
    }: {
        userSettings: UserSettings;
        browser: Browser;
    } = $props();

    let text = $state<string>(browser.selection ? browser.selection : "");
    let translation = $state<string>('');

    const { langTarget, langNative } = userSettings;

    async function handleTranslate(event: MouseEvent): Promise<void> {
        const source = langTarget || 'en';
        const target = langNative || 'en';
        const t = await libreTranslate(text, source, target);
        translation = t.translatedText;
    }

</script>

<div class="flex h-full flex-col p-6">
    <div class="mb-3">
        <h3 class="h3">{$_('translate')}</h3>
    </div>

    <div class="flex-1 overflow-y-auto">
        <form class="max-w mt-4 space-y-4">
            <label class="label">
                <span class="label-text">{$_('original_text')}</span>
                <textarea class="textarea" rows="5" bind:value={text}></textarea>
            </label>
            <label class="label">
                <span class="label-text">{$_('translated_text')}</span>
                <textarea class="textarea" rows="5" bind:value={translation} readonly></textarea>
            </label>
        </form>
    </div>

    <div>
        <hr class="hr mt-4 mb-4" />
        <button type="button" class="btn preset-filled" onclick={handleTranslate} aria-label="logout">
            {$_('translate_text')}
        </button>
    </div>
</div>
