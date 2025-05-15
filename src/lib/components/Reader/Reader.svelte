<script lang="ts">
	import type { User } from '@auth/sveltekit';
	import Toolbar from './Toolbar.svelte';
	import Drawer from './Drawer.svelte';
	import { AnyTool } from './tools';
	import type { Tool } from './types';

	interface ReaderProps {
		user: User;
		tool: Tool | undefined;
	}

	let { user, tool }: ReaderProps = $props();
	let isOpen = $state(false);
</script>

<div class="h-screen">
	<div class="grid h-full w-full grid-cols-[auto_1fr]">
		<Toolbar bind:tool bind:isOpen />
		<!-- Content -->
		<div class="flex flex-col items-center justify-center">
			<pre class="pre">user: {user.name}</pre>
			<pre class="pre">tool: {tool}</pre>
			<div>
				<p>isOpen: {isOpen}</p>
			</div>
		</div>

		<Drawer bind:isOpen>
			{#if (tool !== undefined)}
				<AnyTool {user} {tool}/>
			{/if}
		</Drawer>
	</div>
</div>
