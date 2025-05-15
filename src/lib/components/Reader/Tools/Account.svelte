<script lang="ts">
	import type { User } from '@auth/sveltekit';
	import { signOut } from '@auth/sveltekit/client';
	import { _ } from 'svelte-i18n';
	let { user }: { user: User } = $props();
</script>

<div class="flex flex-row justify-between mb-3">
	<h3 class="h3">{$_('account')}</h3>
	<button
		type="button"
		class="btn preset-filled"
		onclick={() => signOut()}
		aria-label="logout"
	>
		Logout
	</button>
</div>

<form class="max-w mx-auto space-y-4 mt-4">
	<label class="label">
		<span class="label-text">{$_('name')}</span>
		<input type="text" class="input" placeholder={user.name} readonly />
	</label>
	<label class="label">
		<span class="label-text">{$_('email')}</span>
		<input type="text" class="input" placeholder={user.email} readonly />
	</label>
	<label class="label">
		<span class="label-text">{$_('target_language')}</span>
		<select class="select" placeholder={user.email}>
			<option value="en">English</option>
			<option value="es">Español</option>
			<option value="eo">Esperanto</option>
		</select>
	</label>
	<label class="label">
		<span class="label-text">{$_('ui_language')}</span>
		<select class="select" placeholder={user.email}>
			<option value="en">English</option>
			<option value="es">Español</option>
			<option value="eo">Esperanto</option>
		</select>
	</label>
</form>
