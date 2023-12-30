<script lang="ts">
    import {enhance} from '$app/forms'
    import Button from "../components/ui/form/Button.svelte";
    import type { PageData } from './$types';
    export let data : PageData

</script>

<div class="wrap">
    <div class="grid">

    {#each data.movies as movie }
        <article>
            <a href="/film/{movie.id}">
                <img src="https://image.tmdb.org/t/p/original/{movie.posterPath}" alt="poster for {movie.title}">
                {movie.title}
            </a>
        </article>
    {/each}
    </div>
</div>

<style lang="scss">
li {
  padding-block: .5rem;

  &:not(:last-child){
    border-bottom: 1px solid rgba(var(--fg-rgb), .1);
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>