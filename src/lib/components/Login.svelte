<svelte:options runes={false} />

<script lang="ts">
    import { signIn } from '@auth/sveltekit/client';
    
    import { _ } from 'svelte-i18n';
    import { siGithub } from 'simple-icons';
    import Logo from './Logo.svelte';
    import Tagline from './Tagline.svelte';
</script>


<div class="centered full-screen background">
    <div class="card min-w-sm overflow-hidden shadow-lg foreground">
        <div class="px-6 py-4">
            <div class="w-[200px] mx-auto mb-6">
                <Logo
                    classLogo="fill-primary-400 stroke-primary-500"
                    classText="fill-surface-800-200"
                    showText={true}
                />
            </div>
            <div class="mb-6">
                <Tagline interval={3000}/>
            </div>
            <fieldset>
                <button
                    type="button"
                    class="btn preset-filled-primary-500 w-full"
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

    .background {
        background-color: light-dark(
            var(--color-surface-100),
            var(--color-surface-900)
        );
    }

    .foreground {
        background-color: light-dark(
            var(--color-surface-50),
            var(--color-surface-800)
        );
    }
</style>
