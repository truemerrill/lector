<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { Button } from 'bits-ui';
    import { siGithub } from 'simple-icons';
</script>

<div class="centered full-screen">
	<div class="card min-w-sm overflow-hidden shadow-lg">
		<div class="px-6 py-4">
			<fieldset>
				<h2 class="h2">Login</h2>
                <p class="mb-2 opacity-60">Select a login method below.</p>
			</fieldset>
			<fieldset>
				<Button.Root
					type="button"
					class="w-full"
					onclick={() => signIn('github')}
					aria-label="login"
				>
                    <div class="centered">
                        <div class="flex flex-row">
                            <div class="icon">
                                {@html siGithub.svg}
                            </div>
                            <div>Github</div>
                        </div>
                    </div>
				</Button.Root>
			</fieldset>
		</div>
	</div>
</div>

<style>
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}

    .full-screen {
        height: 100vh;
    }

    .icon {
        display: inline-block;
        width: 28px;
        margin-right: 0.5em;
        fill: var(--color-primary-contrast-light);
    }
</style>
