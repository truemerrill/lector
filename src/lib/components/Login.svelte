<svelte:options runes={false} />

<script lang="ts">
    import { signIn } from '@auth/sveltekit/client';
    
    import { _ } from 'svelte-i18n';
    import { siGithub } from 'simple-icons';
</script>


<div class="centered full-screen">
    <div class="card min-w-sm overflow-hidden shadow-lg">
        <div class="px-6 py-4">
            <fieldset>
                <h2 class="h2">{$_('login')}</h2>
                <p class="mb-2 opacity-60">{$_('select_login_method')}</p>
            </fieldset>
            <fieldset>
                <button
                    type="button"
                    class="btn preset-filled w-full"
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
                </button>
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
        fill: var(--base-font-color-dark);
    }
</style>
