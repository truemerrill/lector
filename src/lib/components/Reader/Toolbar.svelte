<script lang="ts">
    import Dock from './Dock.svelte';
    import DockTile from './DockTile.svelte';
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

<Dock value={tool} onValueChange={setTool}>
    {#snippet tiles()}
        <DockTile label={$_('translate')} onclick={() => setTool('translate')}>
            <IconLanguages />
        </DockTile>
        <DockTile label={$_('dictionary')} onclick={() => setTool('dictionary')}>
            <IconBookA />
        </DockTile>
        <DockTile label={$_('flashcard')} onclick={() => setTool('flashcard')}>
            <IconSquareAsterisk />
        </DockTile>
        <DockTile label={$_('account')} onclick={() => setTool('account')}>
            <IconCircleUser />
        </DockTile>
    {/snippet}
</Dock>
