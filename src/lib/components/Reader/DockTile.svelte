<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        onclick,
        label,
        children
    }: {
        onclick: () => void;
        label: string;
        children?: Snippet;
    } = $props();
</script>

<button
    type="button"
    aria-label="nav-item"
    tabindex="0"
    class="dock-tile flex aspect-square w-full flex-col items-center justify-center gap-1 p-2"
    onclick={onclick}
>
    {#if children}
        <div>
            {@render children()}
        </div>
    {/if}
    <div class="text-xs">
        {label}
    </div>
</button>

<style>
    .dock-tile {
        min-width: 90px;
        border-radius: 10px;
    }

    .dock-tile:hover {
        background-color: light-dark(
            var(--color-surface-200), 
            var(--color-surface-800)
        );
    }
</style>