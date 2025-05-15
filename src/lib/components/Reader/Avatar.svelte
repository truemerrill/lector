<script lang="ts">
    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    import { page } from '$app/state';
    import IconCircleUser from '@lucide/svelte/icons/circle-user';
	import type { User } from "@auth/sveltekit";

    let { user }: { user: User } = $props();
</script>

{#if user.image}
    <img src={user.image} alt="Avatar" class="w-16 h-16 rounded-full"/>
{:else}
    <IconCircleUser/>
{/if}