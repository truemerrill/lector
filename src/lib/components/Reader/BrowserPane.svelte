<script lang="ts">
    import type { Browser } from './types';
    import AddressBar from './AddressBar.svelte';
    import './browser.css';
    import { goto } from './browser';

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
    async function handleClick(event: MouseEvent): Promise<void> {
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

</script>


<div class="flex flex-col h-screen">
    <AddressBar bind:browser />
    <div class="flex flex-row justify-center overflow-auto">
        <button 
            class="prose prose-lg content w-full max-w-prose px-4 text-left"
            tabindex="0"
            onclick={handleClick}
            id="browser-content">
            {#if browser.content}
                {@html browser.content.outerHTML}
            {:else}
                <a href="https://google.com" class="a">Google</a>
            {/if}
        </button>
    </div>
</div>
