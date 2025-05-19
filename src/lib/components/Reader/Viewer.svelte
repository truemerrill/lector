<script lang="ts">
    import './viewer.css';

	let {
		content = $bindable()
	}: {
		content: HTMLElement | undefined;
	} = $props();
</script>

<div class="flex flex-row justify-center overflow-auto ">
	<div class="prose prose-lg h-screen w-full max-w-prose px-4 content">
		{#if content}
			{@html content.outerHTML}
        {:else}
            <a href="https://google.com" class="a">Google</a>
		{/if}
	</div>
</div>
