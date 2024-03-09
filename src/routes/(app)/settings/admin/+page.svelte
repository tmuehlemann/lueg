<script lang="ts">
  import type { PageData } from "./$types.js";
  import Heading from "$lib/components/settings/Heading.svelte";

  export let data: PageData;
</script>

<Heading>Admin Settings</Heading>
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
