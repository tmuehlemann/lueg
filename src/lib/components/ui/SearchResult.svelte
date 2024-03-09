<script>
  export let result;
</script>

<article class="@container">
  <div class="@lg:flex relative gap-8 overflow-hidden">
    <picture class="bg-foreground/30 h-full pb-8">
      <img
        class="max-w-72 text-center"
        src={"https://image.tmdb.org/t/p/original/" + result.poster_path}
        alt="poster for {result.title}"
      />
    </picture>
    <div class="max-w-prose pb-8">
      <h2 class="text-3xl">
        {result.title} ({result.release_date.substring(0, 4)})
      </h2>
      {#if result.original_title !== result.title}
        <h3 class="text-xl">{result.original_title}</h3>
      {/if}
      <div class="@lg:block hidden py-4">
        <p class="mb-2">{result.overview}</p>
        <p
          class="bg-foreground/20 inline-block rounded px-2 py-1 font-mono text-xs"
        >
          id: {result.id}
        </p>
      </div>
      <slot />
    </div>
  </div>
</article>
