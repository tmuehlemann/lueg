<script lang="ts">
  import type { PageData } from "./$types";
  import Poster from "$lib/components/ui/Poster.svelte";
  export let data: PageData;
</script>

<div class="container m-auto pt-4">
  <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
    {#each data.movies as movie}
      <article>
        <a href="/film/{movie.id}">
          <div
            style:view-transition-name="poster-{movie.id}"
            class="aspect-poster bg-background w-full overflow-hidden rounded shadow-lg"
          >
            <Poster src={movie.posterPath} alt={movie.title} />
          </div>
        </a>
      </article>
    {/each}
  </div>
</div>
