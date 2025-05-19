<script lang="ts">
    import { Navigation } from '@skeletonlabs/skeleton-svelte';
    import { _ } from 'svelte-i18n';
    import type { Tool } from './types';

    import IconBookA from '@lucide/svelte/icons/book-a';
    import IconLanguages from '@lucide/svelte/icons/languages';
    import IconSquareAsterisk from '@lucide/svelte/icons/square-asterisk';
    import IconCircleUser from '@lucide/svelte/icons/circle-user';

    let { tool = $bindable() }: {tool: Tool | undefined} = $props();

    function isTool(value: any): value is Tool {
        const validTools: Tool[] = [
            'dictionary',
            'flashcard',
            'translate',
            'account'
        ];
        return validTools.includes(value);
    }

    function setTool(value: any): void {
        if (isTool(value)) {
            tool = value;
        } else {
            tool = undefined;
        }
    }
</script>

<Navigation.Rail value={tool} onValueChange={setTool}>
    {#snippet tiles()}
        <Navigation.Tile id="translate" label={$_('translate')} active=""
            ><IconLanguages /></Navigation.Tile
        >
        <Navigation.Tile id="dictionary" label={$_('dictionary')} active=""
            ><IconBookA /></Navigation.Tile
        >
        <Navigation.Tile id="flashcard" label={$_('flashcard')} active=""
            ><IconSquareAsterisk /></Navigation.Tile
        >
        <Navigation.Tile id="account" label={$_('account')} active=""
            ><IconCircleUser /></Navigation.Tile
        >
    {/snippet}
</Navigation.Rail>
