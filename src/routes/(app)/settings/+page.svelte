<script lang="ts">
    import type { PageData } from './$types'
    import {enhance} from "$app/forms";
    import Button from "$lib/components/ui/form/Button.svelte";
    export let data : PageData

    let indexingMovies = false
</script>

<div class="wrap">

    <h1>settings</h1>

    <section class="rounded">
        <h2>user settings</h2>
        <ul>
            <li>set theme color [auto, dark, light]</li>
            <li>change password</li>
            <li>active sessions</li>
        </ul>
    </section>

    <h1>admin area</h1>
        {#if data?.users}
            <section class="users rounded">
                <h2>Users</h2>
                <ul>
                    {#each data.users as user}
                        <li class="user">
                            {user.username}
                        </li>
                    {/each}
                </ul>
            </section>
        {/if}
    <section class="rounded">
        <h2>Filesystem</h2>
        <ul>
            <li>
                <p>
                    Index all movie files which are missing from the library.
                </p>
                <form method="post" action="?/indexMovies" use:enhance={()=>{
                indexingMovies = true;
                return async ({ update }) => {
				await update();
				indexingMovies = false;
			};
            }}>
                    {#if !indexingMovies}

                    <Button>
                        re-index movies
                    </Button>
                    {:else}
                        <p>indexing movies...</p>
                    {/if}
                </form>
            </li>
        </ul>
    </section>
</div>

<style lang="scss">

  section {
    margin-bottom: 2rem;
    border: var(--border);
    padding: 1rem;
  }

    .users {
      li {
        padding: .5rem 0;
        &:not(:last-child) {
          border-bottom: var(--border);
        }
      }
    }
</style>