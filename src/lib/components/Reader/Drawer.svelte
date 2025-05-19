<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import type { Snippet } from 'svelte';

    interface DrawerProps {
        isOpen: boolean;
        close: () => void;
        children?: Snippet;
        transitionDuration?: number;
        className?: string;
    }

    let {
        isOpen = $bindable(),
        close = $bindable(),
        children,
        transitionDuration = 300,
        className = 'w-1/2'
    }: DrawerProps = $props();

    function handleClick(event: MouseEvent): void {
        event.stopPropagation();
        close();
    }

    function handleKeypress(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            close();
        }
    }

    function handleClickDrawer(event: MouseEvent): void {
        event.stopPropagation();
    }
</script>

{#if isOpen}
    <div
        class="overlay"
        role="button"
        tabindex="0"
        onclick={handleClick}
        onkeypress={handleKeypress}
        transition:fade={{ duration: transitionDuration }}
    >
        <div
            class="drawer {className}"
            role="button"
            tabindex="0"
            onclick={handleClickDrawer}
            onkeypress={handleKeypress}
            transition:fly={{ x: 300, duration: transitionDuration }}
        >
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: flex-end;
        z-index: 50;
    }

    .drawer {
        height: 100%;
        background-color: light-dark(white, var(--color-surface-800));
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
        z-index: 51;
    }
</style>
