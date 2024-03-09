<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  const setTheme = (movie) => {
    // document.documentElement.style.setProperty('--bg', movie.bgColor);
    // document.documentElement.style.setProperty('--fg', movie.fgColor);
  };
</script>

<div class="container m-auto pt-4">
  <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
    {#each data.movies as movie}
      <article
        style:--background={movie.bgColor}
        on:mouseenter={() => setTheme(movie)}
      >
        <a href="/film/{movie.id}">
          <div
            class="aspect-poster bg-background relative w-full overflow-hidden rounded shadow-lg"
          >
            <img
              src="/metadata/posters/{movie.posterPath}"
              alt="poster for {movie.title}"
            />
          </div>
        </a>
      </article>
    {/each}
  </div>
</div>
