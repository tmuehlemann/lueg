<script lang="ts">
    import {enhance} from '$app/forms'
    import Button from "../components/ui/form/Button.svelte";
    import type { PageData } from './$types';
    export let data : PageData

    const setTheme = (movie) => {
        // document.documentElement.style.setProperty('--bg', movie.bgColor);
        // document.documentElement.style.setProperty('--fg', movie.fgColor);
    }

</script>

<div class="wrap">
    <div class="grid">

    {#each data.movies as movie }
        <article style:--bg={movie.bgColor} on:mouseenter={()=>setTheme(movie)}>
            <a href="/film/{movie.id}">
                <div class="poster">
                    <img src="/metadata/posters/{movie.posterPath}" alt="poster for {movie.title}">
                </div>
                <!--{movie.title}-->
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
article{
  .poster{
    width: 100%;
    aspect-ratio: auto 1 / 1.5;
    background: var(--bg);
    position: relative;
    box-shadow: 0 0 1rem rgba(var(--fg-rgb), .1);
  }
}
</style>