<script type="ts">

    import Button from "../../../components/ui/form/Button.svelte";
    import {Play} from "lucide-svelte";
    import {onMount} from "svelte";

    export let data

    let movie
    $: movie = data.movie

    $: {
        console.log(movie)
    }

    // todo: extract from backdrop image
    const fg = '#fff'
    const bg = '#000'

    onMount(() => {
        const root = document.documentElement;

        root.style.setProperty('--spacer-height', '0');
        return () => {
            root.style.removeProperty('--spacer-height')
        }
    })

</script>

<div class="page"
        style:--bg={bg}
        style:--fg={fg}
        style:background-image={`url(https://image.tmdb.org/t/p/original/${movie.backdropPath})`}
>
    <main class="wrap">

        <div class="poster">
            <img src="https://image.tmdb.org/t/p/original/{movie.posterPath}" alt="{movie.title} poster">
        </div>

        <div>
            <h1 class="pb1">
                {movie.title}
            </h1>
                <h2 class="pb1">
                    ({movie.releaseDate.getFullYear()})
                    {#if movie.title !== movie.originalTitle}
                        {movie.originalTitle}
                    {/if}
                    <!-- directed by ?-->
                </h2>

            <ul class="pills pb1">
                {#each movie.genres as genre}
                    <li class="pill">
                        {genre.name}
                    </li>
                {/each}
            </ul>

            <div class="max-reading pb1">
                <p class="big pb1">
                    {movie.tagline}
                </p>

                <p class="pb1">
                    {movie.overview}
                </p>

                <div class="pb1">
                    <Button>
                        <Play size={18}/>
                        Watch
                    </Button>
                </div>
            </div>

        </div>
    </main>

    <div class="wrap">
        <h3>details</h3>
        <div class="details">
            <div class="key">runtime</div>
            <div class="value">{movie.runtime} min.</div>
            <div class="key">status</div>
            <div class="value">{movie.status}</div>
            <div class="key">budget</div>
            <div class="value">{new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'USD'
            }).format(movie.budget)}</div>
            <div class="key">revenue</div>
            <div class="value">{new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'USD'
            }).format(movie.revenue)}</div>
        </div>

        <h3>links</h3>
        <ul class="links pills">
            <li class="pill"><a target="_blank" href="https://imdb.com/title/{movie.imdbId}">imdb</a></li>
            <li class="pill"><a target="_blank" href="https://www.themoviedb.org/movie/{movie.tmdbId}">tmdb</a></li>
        </ul>
    </div>
</div>

<style lang="scss">

  .page {
    color: var(--fg);
    min-height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: 8vmin;
  }

  main {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding-top: 8vmin;
  }
  .poster {
    max-width: 300px;
  }
  .pills {
    display: flex;
    gap: .5rem;
  }
  .pill {
    border-radius: 5rem;
    border: var(--fg) 1px solid;
    padding: 0 1rem;
  }
    .big {
      font-size: .8rem;
      text-transform: uppercase;
      letter-spacing: .06rem;
      font-weight: 600;
    }
    .pb1 {
      padding-bottom: 1rem;
    }
    .links a {
      text-decoration: underline;
    }

    .details {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      row-gap: 0.5rem;
    }

    h3 {
      font-weight: 400;
      margin-top: 2rem;
      margin-bottom: .5rem;
    }
</style>