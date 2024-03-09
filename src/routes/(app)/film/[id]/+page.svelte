<script lang="ts">
  import Button from "$lib/components/ui/form/Button.svelte";
  import { Play } from "lucide-svelte";
  import { onMount } from "svelte";
  import tinycolor from "tinycolor2";
  import { formatTime } from "$lib/helper/formatters";

  export let data;

  let movie;
  $: movie = data.movie;

  $: {
    console.log(movie);
    applyMovieColors(movie);
  }

  function applyMovieColors(movie) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const fg = tinycolor(movie.fgColor);
    const bg = tinycolor(movie.bgColor);
    const primary = tinycolor(movie.primaryColor);

    root.style.setProperty("--foreground", toRgb(fg));
    root.style.setProperty("--background", toRgb(bg));
    root.style.setProperty("--border", toRgb(fg));
    root.style.setProperty("--primary", primary.toString());
  }

  onMount(() => {
    // cleanup
    return () => {
      if (!document?.documentElement) return;
      const root = document.documentElement;

      root.style.removeProperty("--foreground");
      root.style.removeProperty("--background");
      root.style.removeProperty("--border");
      root.style.removeProperty("--primary");
    };
  });

  export function toRgb(color: tinycolor.Instance) {
    return Object.values(color.toRgb()) // convert to array
      .slice(0, 3) // remove alpha
      .join(" "); // convert to string
  }
</script>

<div class="text-foreground bg-background z-0 min-h-full pb-[8vmin]">
  <!--  backdrop -->
  <div class="absolute inset-0 z-[1] h-screen">
    <div class="gradient-mask absolute inset-0 z-10 backdrop-blur-md"></div>
    <div
      class="to- via-background/80 to-background absolute inset-0 bg-gradient-to-b from-transparent"
    ></div>
    <img
      class="h-full w-full object-cover"
      src="/metadata/backdrops/{movie.backdropPath}"
      alt="backdrop"
    />
  </div>

  <main
    class="container relative z-10 m-auto flex content-center gap-12 pt-[calc(5rem+20vmin)]"
  >
    <div class="max-w-[300px]">
      <img
        src="/metadata/posters/{movie.posterPath}"
        alt="{movie.title} poster"
      />
    </div>

    <div>
      <h1 class="pb-4 text-4xl">
        {movie.title}
      </h1>
      <h2 class="text-primary pb-4 text-xl">
        <span>
          ({movie.releaseDate.getFullYear()})
        </span>
        ·
        {#if movie.title !== movie.originalTitle}
          <span>
            {movie.originalTitle}
          </span>
          ·
        {/if}
        <span>
          {formatTime(movie.runtime)}
        </span>
        <!-- directed by ?-->
      </h2>

      <ul class="flex gap-2 pb-4">
        {#each movie.genres as genre}
          <li class="border-foreground rounded-full border px-4">
            {genre.name}
          </li>
        {/each}
      </ul>

      <div class="max-w-prose pb-4">
        <p class="pb-4 text-sm font-medium uppercase tracking-wider">
          {movie.tagline}
        </p>

        <p class="pb-4">
          {movie.overview}
        </p>

        <div class="pb-4">
          {#each movie.fileUploads as fileUpload}
            <Button href="/watch/{fileUpload.id}" --fg="var(--primary)">
              <Play size={18} />
              Watch
              {#if movie.fileUploads.length > 1}
                {fileUpload.path}
              {/if}
            </Button>
          {/each}
        </div>
      </div>
    </div>
  </main>

  <div class="container relative z-10 m-auto">
    <h3 class="mb-2 mt-8">details</h3>
    <div class="grid grid-cols-2 gap-x-8 gap-y-2">
      <div class="key">runtime</div>
      <div class="value">{movie.runtime} min.</div>
      <div class="key">status</div>
      <div class="value">{movie.status}</div>
      <div class="key">budget</div>
      <div class="value">
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(movie.budget)}
      </div>
      <div class="key">revenue</div>
      <div class="value">
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(movie.revenue)}
      </div>
    </div>

    <h3 class="mb-2 mt-8">links</h3>
    <ul class="flex gap-2 pb-4">
      <li class="border-foreground rounded-full border px-4">
        <a
          class="underline"
          target="_blank"
          href="https://imdb.com/title/{movie.imdbId}">imdb</a
        >
      </li>
      <li class="border-foreground rounded-full border px-4">
        <a
          class="underline"
          target="_blank"
          href="https://www.themoviedb.org/movie/{movie.tmdbId}">tmdb</a
        >
      </li>
    </ul>
  </div>
</div>

<style class="postcss">
  .gradient-mask {
    -webkit-mask: linear-gradient(180deg, transparent, black 50vmin);
  }
</style>
