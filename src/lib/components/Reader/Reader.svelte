<script lang="ts">
    import type { User } from '@auth/sveltekit';
    import type { UserSettings } from '$lib/db/types';
    import type { Tool, Browser } from '$lib/types';

    import { Toaster } from '@skeletonlabs/skeleton-svelte';

    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { locale } from 'svelte-i18n';
    import Toolbar from './Toolbar.svelte';
    import ToolPane from './ToolPane.svelte';
    import BrowserPane from './BrowserPane.svelte';
    import { toaster } from './toaster';

    let user = $derived(page.data.session?.user);
    let userSettings = $state<UserSettings | undefined>(undefined);
    let tool = $state<Tool | undefined>(undefined);
    let browser = $state<Browser>({
        history: [],
        index: null,
        status: 500
    });

    async function fetchSettings(user: User | undefined) {
        try {
            const result = await fetch('/api/user');
            if (result.ok) {
                return await result.json();
            } else {
                const insert = await fetch('/api/user', {
                    method: 'POST',
                    body: JSON.stringify(user)
                });
                if (insert.ok) {
                    return await result.json();
                } else {
                    return undefined;
                }
            }
        } catch (err) {
            return undefined;
        }
    }

    onMount(async () => {
        userSettings = await fetchSettings(user);
        locale.set(userSettings?.langInterface || 'en');
    });
</script>

{#if user}
    <Toaster {toaster}></Toaster>
    <div class="h-screen w-screen">
        <div>
            <Toolbar bind:tool />
            <BrowserPane bind:browser />
            <ToolPane bind:userSettings bind:tool {browser} />
        </div>
    </div>
{/if}
