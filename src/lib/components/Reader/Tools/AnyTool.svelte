<script lang="ts">
    import Dictionary from './Dictionary.svelte';
    import Documents from './Documents.svelte';
    import Flashcard from './Flashcard.svelte';
    import Account from './Account.svelte';
    import Read from './Read.svelte';
    import Translate from './Translate.svelte';
    import type { Tool } from '../types';
    import type { UserSettings } from '$lib/db/types';

    let {
        content = $bindable(),
        settings = $bindable(),
        tool,
        isOpen = $bindable()
    }: {
        content: HTMLElement | undefined;
        settings: UserSettings;
        tool: Tool;
        isOpen: boolean;
    } = $props();
</script>

<div class="card h-full">
    {#if tool === 'documents'}
        <Documents />
    {:else if tool === 'read'}
        <Read bind:content />
    {:else if tool === 'translate'}
        <Translate />
    {:else if tool === 'dictionary'}
        <Dictionary />
    {:else if tool === 'flashcard'}
        <Flashcard />
    {:else if tool === 'account'}
        <Account bind:settings bind:isOpen />
    {:else}
        <div></div>
    {/if}
</div>
