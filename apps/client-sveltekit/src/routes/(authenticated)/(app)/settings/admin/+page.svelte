<script lang="ts">
  import type { PageData } from "./$types.js";
  import Heading from "$lib/components/settings/Heading.svelte";

  export let data: PageData;

  // todo: get users from backend
  const users: { username: string }[] = [];
</script>

<Heading>Admin Settings</Heading>
{#if users}
  <section class="mb-8 rounded border border-border p-4">
    <h2>Users</h2>
    <ul>
      {#each users as user}
        <li class="border-border py-2 not-last:border-b">
          {user.username}
        </li>
      {/each}
    </ul>
  </section>
{/if}
