<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/form/Button.svelte";
  export let data: PageData;

  let indexingMovies = false;
</script>

<div class="container m-auto">
  <h1>settings</h1>

  <section class="border-border mb-8 rounded border p-4">
    <h2>user settings</h2>
    <ul>
      <li>set theme color [auto, dark, light]</li>
      <li>change password</li>
      <li>active sessions</li>
    </ul>
  </section>

  <h1>admin area</h1>
  {#if data?.users}
    <section class="border-border mb-8 rounded border p-4">
      <h2>Users</h2>
      <ul>
        {#each data.users as user}
          <li class="border-border not-last:border-b py-2">
            {user.username}
          </li>
        {/each}
      </ul>
    </section>
  {/if}
  <section class="border-border mb-8 rounded border p-4">
    <h2>Filesystem</h2>
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
  </section>
</div>
