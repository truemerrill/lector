<script lang="ts">
    import type { Browser } from './types';
    import './browser.css';

    let {
        browser = $bindable()
    }: {
        browser: Browser;
    } = $props();
</script>


<div class="flex flex-col">
    <div class="flex flex-row justify-center overflow-auto">
        <div class="prose prose-lg content h-screen w-full max-w-prose px-4">
            {#if browser.content}
                {@html browser.content.outerHTML}
            {:else}
                <a href="https://google.com" class="a">Google</a>
            {/if}
        </div>
    </div>
</div>
