<script lang="ts">
   import { signIn } from "@auth/sveltekit/client"
</script>
 
<div>
  <img src="/img/logo.svg" alt="Company Logo" />
  <button onclick={() => signIn('github')} aria-label="login" >Login</button>
</div> 


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
