<script lang="ts">
    import type { Browser } from '$lib/types';
    import ArrowLeft from '@lucide/svelte/icons/arrow-left';
    import ArrowRight from '@lucide/svelte/icons/arrow-right';
    import RotateCw from '@lucide/svelte/icons/rotate-cw';
    import { load, goto, back, forward } from './browser';

    let {
        browser = $bindable()
    }: {
        browser: Browser;
    } = $props();

    async function handleKeypress(event: KeyboardEvent): Promise<void> {
        if (event.code === 'Enter') {
            if (browser.urlString) {
                browser = await goto(browser, browser.urlString);
            }
        }
    }

    async function handleForward(event: MouseEvent): Promise<void> {
        browser = await forward(browser);
    }

    async function handleBackward(event: MouseEvent): Promise<void> {
        browser = await back(browser);
    }

    async function handleReload(event: MouseEvent): Promise<void> {
        if (browser.urlString) {
            browser = await load(browser, browser.urlString);
        }
    }

</script>

<div
    class="address-bar flex flex-row items-center justify-center"
    role="button"
    tabindex="0"
    onkeypress={handleKeypress}
>
    <button class="ml-2" onclick={handleBackward}>
        <ArrowLeft size={18} />
    </button>
    <button onclick={handleForward}>
        <ArrowRight size={18} />
    </button>
    <button onclick={handleReload}>
        <RotateCw size={18} />
    </button>
    <div class="url mr-2">
        <input type="text" id="address" bind:value={browser.urlString} />
    </div>
</div>

<style>
    .address-bar {
        padding-top: 4px;
        padding-bottom: 4px;
        border-color: light-dark(var(--color-surface-200), var(--color-surface-800));
        border-width: 1pt;
        background-color: light-dark(var(--color-surface-100), var(--color-surface-900));
        z-index: 20;

        button {
            min-width: 30px;
            min-height: 24px;
            aspect-ratio: 1;
            justify-content: center;
        }

        button:hover {
            background-color: light-dark(
                var(--color-surface-200), 
                var(--color-surface-800)
            );
        }

        .url {
            flex-grow: 1;
            display: flex;
        }

        input {
            padding: 4px;
            border-radius: 5px;
            width: 100%;

            background-color: light-dark(white, var(--color-surface-700));
        }
    }
</style>
