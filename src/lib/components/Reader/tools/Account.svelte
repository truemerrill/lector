<script lang="ts">
    import type { UserSettings } from '$lib/db/types';
    import type { Tool } from '$lib/types';
    import { signOut } from '@auth/sveltekit/client';
    import { _, locale } from 'svelte-i18n';
    import { toaster } from '../toaster';

    let {
        userSettings: userSettings = $bindable(),
        tool = $bindable()
    }: { userSettings: UserSettings; tool: Tool | undefined } = $props();

    async function handleSave() {
        try {
            const result = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(userSettings)
            });
            if (result.ok) {
                userSettings = await result.json();
            }

            toaster.info({
                title: $_('saved_settings')
            });
        } catch (err) {
            console.error(err);
        }

        tool = undefined;
    }

    $effect(() => {
        locale.set(userSettings.langInterface || 'en');
    });
</script>

<div class="flex h-full flex-col p-6">
    <div class="mb-3 flex flex-row justify-between">
        <h3 class="h3">{$_('account')}</h3>
        <button
            type="button"
            class="btn preset-filled-primary-500"
            onclick={() => signOut()}
            aria-label="logout"
        >
            {$_('logout')}
        </button>
    </div>

    <div class="flex-1 overflow-y-auto">
        <form class="max-w mt-4 space-y-4">
            <label class="label">
                <span class="label-text">{$_('name')}</span>
                <input type="text" class="input" bind:value={userSettings.name} readonly />
            </label>
            <label class="label">
                <span class="label-text">{$_('email')}</span>
                <input type="text" class="input" bind:value={userSettings.email} readonly />
            </label>
            <label class="label">
                <span class="label-text">{$_('native_language')}</span>
                <select class="select" bind:value={userSettings.langNative}>
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="eo">Esperanto</option>
                    <option value="fr">Français</option>
                    <option value="it">Italiano</option>
                    <option value="jp">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="pl">Polski</option>
                    <option value="ru">Русский</option>
                    <option value="uk">Українська</option>
                </select>
            </label>
            <label class="label">
                <span class="label-text">{$_('target_language')}</span>
                <select class="select" bind:value={userSettings.langTarget}>
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="eo">Esperanto</option>
                    <option value="fr">Français</option>
                    <option value="it">Italiano</option>
                    <option value="jp">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="pl">Polski</option>
                    <option value="ru">Русский</option>
                    <option value="uk">Українська</option>
                </select>
            </label>
            <label class="label">
                <span class="label-text">{$_('ui_language')}</span>
                <select class="select" bind:value={userSettings.langInterface}>
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="eo">Esperanto</option>
                    <option value="fr">Français</option>
                    <option value="it">Italiano</option>
                    <option value="jp">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="pl">Polski</option>
                    <option value="ru">Русский</option>
                    <option value="uk">Українська</option>
                </select>
            </label>
        </form>
    </div>

    <div>
        <hr class="hr mt-4 mb-4" />
        <button type="button" class="btn preset-filled-primary-500" onclick={handleSave} aria-label="logout">
            {$_('save_settings')}
        </button>
    </div>
</div>
