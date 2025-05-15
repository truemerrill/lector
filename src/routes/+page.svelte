<script lang="ts">
    import { isLoading } from 'svelte-i18n';
    import { page } from '$app/state';
    import Login from "$lib/components/Login.svelte";
    import Reader from "$lib/components/Reader/Reader.svelte";
    import Suspense from '$lib/components/Suspense.svelte';

    let user = $state(page.data.session?.user)
</script>

{#if $isLoading}
    <div class="h-screen">
        <Suspense/>
    </div>
{:else}
    {#if user !== undefined}
        <Reader user={user} tool={undefined}/>
    {:else}
        <Login/>
    {/if}
{/if}