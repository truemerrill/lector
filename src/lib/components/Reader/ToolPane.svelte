<script lang="ts">
    import type { Browser, Tool } from '$lib/types';
    import type { UserSettings } from '$lib/db/types';

    import Suspense from '$lib/components/Suspense.svelte';
    import Drawer from './Drawer.svelte';
    import Dictionary from './tools/Dictionary.svelte';
    import Flashcard from './tools/Flashcard.svelte';
    import Account from './tools/Account.svelte';
    import Translate from './tools/Translate.svelte';

    let {
        userSettings = $bindable(),
        tool = $bindable(),
        browser,
    }: {
        userSettings: UserSettings | undefined;
        tool: Tool | undefined;
        browser: Browser;
    } = $props();

    // Open the drawer if the tool is defined
    let isOpen = $derived(tool !== undefined);

    // svelte-ignore non_reactive_update
    function close(): void {
        tool = undefined;
    }
</script>

<Drawer bind:isOpen bind:close>
    {#if tool !== undefined && userSettings !== undefined}
        <div class="card h-full">
            {#if tool === 'translate'}
                <Translate userSettings={userSettings} browser={browser} />
            {:else if tool === 'dictionary'}
                <Dictionary />
            {:else if tool === 'flashcard'}
                <Flashcard />
            {:else if tool === 'account'}
                <Account bind:userSettings bind:tool />
            {:else}
                <div></div>
            {/if}
        </div>
    {:else}
        <div class="h-full">
            <Suspense />
        </div>
    {/if}
</Drawer>


