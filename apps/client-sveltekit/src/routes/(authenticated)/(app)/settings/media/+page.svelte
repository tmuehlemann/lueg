<script>
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/form/Button.svelte";
  import Heading from "$lib/components/settings/Heading.svelte";
  import { apiFetch } from "$lib/service/service";
  let indexingMovies = false;

  async function syncLibraryWithFilesystem() {
    indexingMovies = true;
    await apiFetch("/movies/sync", {
      authenticated: true,
      emptyResponse: true,
    });
    indexingMovies = false;
  }
</script>

<Heading>Media settings</Heading>
<Heading>Filesystem</Heading>
<ul>
  <li>
    <p>Index all movie files which are missing from the library.</p>
    {#if !indexingMovies}
      <Button on:click={syncLibraryWithFilesystem}>re-index movies</Button>
    {:else}
      <p>indexing movies...</p>
    {/if}
  </li>
</ul>
