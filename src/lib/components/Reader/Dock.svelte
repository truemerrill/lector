<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        value = $bindable(),
        onValueChange = $bindable(),
        tiles,

        // Tiles
        tilesBase = 'flex-1 flex',
        tilesFlexDirection = 'flex-col',
        tilesJustify = 'justify-center',
        tilesItems = 'items-center',
        tilesGap = 'gap-1',
        tilesClasses = ''
    }: {
        value: any;
        onValueChange: (newValue: any) => void;
        tiles: Snippet;

        // Tiles
        tilesBase?: string;
        tilesFlexDirection?: string;
        tilesJustify?: string;
        tilesItems?: string;
        tilesGap?: string;
        tilesClasses?: string;
    } = $props();
</script>

<div class="fixed flex flex-col h-full justify-center">
    <aside class="dock flex-none">
        {#if tiles}
            <nav
                class="{tilesBase} {tilesFlexDirection} {tilesJustify} {tilesItems} {tilesGap} {tilesClasses}"
            >
                {@render tiles()}
            </nav>
        {/if}
    </aside>
</div>

<style>
    .overlay {
        /* position: fixed;
        width: 100%;
        height: 100%; */
        pointer-events: none;
        /* z-index: 10; */
    }

    .dock {
        z-index: 11;
        border-radius: 10px;
        border-color: light-dark(
            var(--color-surface-200),
            var(--color-surface-800)
        );
        border-width: 1pt;
        background-color: light-dark(
            var(--color-surface-100), 
            var(--color-surface-900)
        );
    }
</style>
