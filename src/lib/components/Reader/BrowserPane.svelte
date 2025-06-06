<script lang="ts">
    import type { Browser } from '$lib/types';
    import AddressBar from './AddressBar.svelte';
    import './browser.css';
    import { goto } from './browser';
    import Logo from '$lib/components/Logo.svelte';

    let {
        browser = $bindable()
    }: {
        browser: Browser;
    } = $props();

    /**
     * Handle click on links so they are routed through the proxy.
     *
     * @param event
     */
    async function handleClick(event: Event): Promise<void> {
        const target = event.target as Element | null;
        if (!target) return;

        // Traverse the DOM to find the nearest anchor
        const anchor = target.closest?.('a[data-reader-link]');
        if (anchor && anchor.getAttribute('href')) {
            const href = anchor.getAttribute('href');
            if (href) {
                event.preventDefault();
                browser = await goto(browser, href);
            }
        }
    }

    function handleMouseUp(event: MouseEvent): void {
        const selection = window.getSelection();
        const text = selection?.toString();
        browser = { ...browser, selection: text };
    }
</script>

<div class="flex h-screen flex-col">
    <AddressBar bind:browser />
    <div class="flex flex-row justify-center overflow-auto">
        <div
            class="prose prose-lg content w-full max-w-prose px-4 text-left"
            role="button"
            tabindex="0"
            onclick={handleClick}
            onkeydown={handleClick}
            onmouseup={handleMouseUp}
            id="browser-content"
        >
            {#if browser.content}
                {@html browser.content.outerHTML}
            {:else}
                <div class="flex flex-col h-screen justify-center">
                    <div class="mx-auto w-[300px] opacity-50">
                        <Logo
                            classLogo="fill-primary-400 stroke-primary-500"
                            classText="fill-surface-800-200"
                            showText={true}
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
