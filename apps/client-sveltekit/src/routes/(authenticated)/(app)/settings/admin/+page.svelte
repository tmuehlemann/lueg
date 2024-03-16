<script lang="ts">
  import type { PageData } from "./$types.js";
  import Heading from "$lib/components/settings/Heading.svelte";

  export let data: PageData;

  // todo: get users from backend
  const users: { username: string }[] = [];

  const integrations = [
    {
      name: "The Movie Database",
      description:
        "Get detailed information about Movies. Supports images including backdrop, logo, poster and stills.",
      logo: "/images/tmdb.png",
    },
    {
      name: "Letterboxd (Planned)",
      description: "Sync your watchlist and diary with Letterboxd.",
      logo: "https://s.ltrbxd.com/static/img/icons/touch-icon-192x192.257b84e7.png",
    },
  ];
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

  <section class="mb-8 rounded-2xl border border-border p-4">
    <h2 class="pb-4 text-xl">Integrations</h2>
    <ul class="flex flex-col gap-4">
      {#each integrations as integration}
        <li class="flex items-center gap-4 rounded-xl border border-border p-2">
          {#if integration.logo}
            <div class="size-10 shrink-0 overflow-hidden rounded-xl">
              <img
                src={integration.logo}
                alt="{integration.name} logo"
                class="h-full w-full object-cover"
              />
            </div>
          {/if}
          <div>
            <h4 class="text-md font-semibold">{integration.name}</h4>
            <p>
              {integration.description}
            </p>
          </div>
        </li>
      {/each}
    </ul>
  </section>
{/if}
