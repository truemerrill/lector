<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { _, locale } from 'svelte-i18n';
	import type { UserSettings } from '$lib/db/types';
	let {
		settings = $bindable(),
		isOpen = $bindable()
	}: { settings: UserSettings; isOpen: boolean } = $props();

	async function handleSave() {
		try {
			const result = await fetch('/api/user', {
				method: 'POST',
				body: JSON.stringify(settings)
			});
			if (result.ok) {
				settings = await result.json();
			}
		} catch(err) {
			console.error(err);
		}

		isOpen = false;
	}

	$effect(() => {
		locale.set(settings.langInterface || 'en');
	})
</script>

<div class="flex h-full flex-col p-6">
	<div class="mb-3 flex flex-row justify-between">
		<h3 class="h3">{$_('account')}</h3>
		<button type="button" class="btn preset-filled" onclick={() => signOut()} aria-label="logout">
			{$_('logout')}
		</button>
	</div>

	<div class="flex-1 overflow-y-auto">
		<form class="max-w mt-4 space-y-4">
			<label class="label">
				<span class="label-text">{$_('name')}</span>
				<input type="text" class="input" bind:value={settings.name} readonly />
			</label>
			<label class="label">
				<span class="label-text">{$_('email')}</span>
				<input type="text" class="input" bind:value={settings.email} readonly />
			</label>
			<label class="label">
				<span class="label-text">{$_('target_language')}</span>
				<select class="select" bind:value={settings.langTarget}>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="eo">Esperanto</option>
				</select>
			</label>
			<label class="label">
				<span class="label-text">{$_('ui_language')}</span>
				<select class="select" bind:value={settings.langInterface}>
					<option value="en">English</option>
					<option value="es">Español</option>
					<option value="eo">Esperanto</option>
				</select>
			</label>
		</form>
	</div>

	<div>
		<hr class="hr mt-4 mb-4" />
		<button
			type="button"
			class="btn preset-filled"
			onclick={handleSave}
			aria-label="logout"
		>
			{$_('save_settings')}
		</button>
	</div>
</div>
