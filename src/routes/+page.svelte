<script lang="ts">
    import { page } from '$app/state';
    import Login from "$lib/components/Login.svelte";
    import Reader from "$lib/components/Reader/Reader.svelte";

    let user = $state(page.data.session?.user);

    console.log(page.data.session?.user);
</script>
 
{#if user !== undefined}
    <Reader user={user}/>
{:else}
    <Login/>
{/if}
