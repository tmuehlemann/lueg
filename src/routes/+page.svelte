<script lang="ts">
    import {enhance} from '$app/forms'
    import Button from "../components/ui/form/Button.svelte";
    import type { PageData } from './$types';
    export let data : PageData

</script>

<div class="wrap">
    <h1>Welcome {data.user.username}</h1>
    <p>
        this is Lueg️ 👀
    </p>

    movies:
    {#each data.movies as movie }
        <article>
            <a href="/film/{movie.id}">
                <img src="https://image.tmdb.org/t/p/original/{movie.posterPath}" alt="poster for {movie.title}">
                {movie.title}
                <pre>
                json: {JSON.stringify(movie, null, 2)}
                </pre>
            </a>
        </article>
    {/each}
</div>

<style lang="scss">
li {
  padding-block: .5rem;

  &:not(:last-child){
    border-bottom: 1px solid rgba(var(--fg-rgb), .1);
  }
}
</style>