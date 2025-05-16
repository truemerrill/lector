<script lang="ts">
	import type { User } from '@auth/sveltekit';
	import { onMount } from 'svelte';
	import Toolbar from './Toolbar.svelte';
	import Drawer from './Drawer.svelte';
	import Suspense from '$lib/components/Suspense.svelte';
	import { AnyTool } from './tools';
	import type { Tool } from './types';
	import type { UserSettings } from '$lib/db/types';
	import { page } from '$app/state';
	import { locale } from 'svelte-i18n';

	let user = $derived(page.data.session?.user);
	let settings = $state<UserSettings | undefined>(undefined)
	let tool = $state<Tool | undefined>(undefined);
	let isOpen = $state(false);
	
	async function fetchSettings(user: User | undefined) {
		try {
			const result = await fetch("/api/user");
			if (result.ok) {
				return await result.json();
			} else {
				const insert = await fetch("/api/user", {
					method: 'POST',
					body: JSON.stringify(user)
				});
				if (insert.ok) {
					return await result.json();
				} else {
					return undefined;
				}
			}
		} catch(err) {
			return undefined;
		}
	}

	onMount(async () => {
		settings = await fetchSettings(user);
		locale.set(settings?.langInterface || 'en');
	})
</script>

{#if user}
<div class="h-screen">
	<div class="grid h-full w-full grid-cols-[auto_1fr]">
		<Toolbar bind:tool bind:isOpen />
		<!-- Content -->
		<div class="flex flex-col justify-center">
			<pre class="pre">user: {user.name}</pre>
			<pre class="pre">tool: {tool}</pre>
			<div>
				<p>isOpen: {isOpen}</p>
			</div>
			<div><p>{JSON.stringify(settings)}</p></div>
		</div>

		<Drawer bind:isOpen>
			{#if ((tool !== undefined) && (settings !== undefined))}
				<AnyTool bind:settings {tool} bind:isOpen/>
			{:else}
				<div class="h-full">
					<Suspense/>
				</div>
			{/if}
		</Drawer>
	</div>
</div>
{/if}