<script lang="ts">
    import { isLoading } from 'svelte-i18n';
    import { page } from '$app/state';
    import Login from '$lib/components/Login.svelte';
    import { Reader } from '$lib/components/reader';
    import Suspense from '$lib/components/Suspense.svelte';

    let user = $state(page.data.session?.user);
</script>

{#if $isLoading}
    <div class="h-screen">
        <Suspense />
    </div>
{:else if user !== undefined}
    <Reader />
{:else}
    <Login />
{/if}
