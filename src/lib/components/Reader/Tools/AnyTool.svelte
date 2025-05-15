<script lang="ts">
    import type { User } from '@auth/sveltekit';
    import Dictionary from "./Dictionary.svelte";
    import Documents from "./Documents.svelte";
    import Flashcard from "./Flashcard.svelte";
    import Account from "./Account.svelte";
    import Translate from "./Translate.svelte";
    import type { Tool } from '../types';

    let { user, tool }: { user: User, tool: Tool } = $props();
</script>

<div class="card m-6">
{#if (tool === 'documents')}
    <Documents/>
{:else if (tool === 'translate')}
    <Translate/>
{:else if (tool === 'dictionary')}
    <Dictionary/>
{:else if (tool === 'flashcard')}
    <Flashcard/>
{:else if (tool === 'account')}
    <Account {user}/>
{:else}
    <div></div>
{/if}
</div>