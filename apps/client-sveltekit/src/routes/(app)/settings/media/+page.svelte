<script>
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/form/Button.svelte";
  import Heading from "$lib/components/settings/Heading.svelte";
  let indexingMovies = false;
</script>

<Heading>Media settings</Heading>
<Heading>Filesystem</Heading>
<ul>
  <li>
    <p>Index all movie files which are missing from the library.</p>
    <form
      method="post"
      action="?/indexMovies"
      use:enhance={() => {
        indexingMovies = true;
        return async ({ update }) => {
          await update();
          indexingMovies = false;
        };
      }}
    >
      {#if !indexingMovies}
        <Button>re-index movies</Button>
      {:else}
        <p>indexing movies...</p>
      {/if}
    </form>
  </li>
</ul>
