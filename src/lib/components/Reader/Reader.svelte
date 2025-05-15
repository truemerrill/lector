<script lang="ts">
    import { Command } from 'bits-ui';
    import type { User } from "@auth/sveltekit";

    let { user }: { user: User } = $props();
</script>

<Command.Root>
  <Command.Input
    placeholder="Search for something..."
  />
</Command.Root>

<p>Hello {user.name}</p>