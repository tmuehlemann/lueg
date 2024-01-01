<script lang="ts">

    import Button from "$lib/components/ui/form/Button.svelte";
    import {Play} from "lucide-svelte";
    import {onMount} from "svelte";
    import tinycolor from "tinycolor2";
    import {formatTime} from "$lib/helper/formatters";

    export let data

    let movie
    $: movie = data.movie

    $: {
        console.log(movie)
        applyMovieColors(movie)
    }

    function applyMovieColors(movie) {
        if (typeof document === "undefined") return;
        const root = document.documentElement;

        const fg = tinycolor(movie.fgColor)
        const bg = tinycolor(movie.bgColor)
        const primary = tinycolor(movie.primaryColor)

        root.style.setProperty('--spacer-height', '0');
        root.style.setProperty('--fg', fg.toString() );
        root.style.setProperty('--fg-rgb', toRgb(fg) );
        root.style.setProperty('--bg', bg.toString() );
        root.style.setProperty('--bg-rgb', toRgb(bg) );
        root.style.setProperty('--primary', primary.toString() );
    }

    onMount(() => {

        // cleanup
        return () => {
            if (!document?.documentElement) return;
            const root = document.documentElement;

            root.style.removeProperty('--spacer-height')
            root.style.removeProperty('--fg')
            root.style.removeProperty('--fg-rgb')
            root.style.removeProperty('--bg')
            root.style.removeProperty('--bg-rgb')
            root.style.removeProperty('--primary')
        }
    })

    export function toRgb(color : tinycolor.Instance) {
        return Object
            .values(color.toRgb()) // convert to array
            .slice(0,3) // remove alpha
            .join(', ') // convert to string
    }
</script>

<div class="page">
    <div class="backdrop">
        <img src="/metadata/backdrops/{movie.backdropPath}" alt="backdrop">
    </div>
    <main class="wrap">

        <div class="poster">
            <img src="/metadata/posters/{movie.posterPath}" alt="{movie.title} poster">
        </div>

        <div>
            <h1 class="pb1">
                {movie.title}
            </h1>
                <h2 class="pb1">
                    <span>
                    ({movie.releaseDate.getFullYear()})
                    </span>
                    {#if movie.title !== movie.originalTitle}
                        <span>
                        {movie.originalTitle}
                        </span>
                    {/if}
                    <span>
                    {formatTime(movie.runtime)}
                    </span>
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
                    {#each movie.fileUploads as fileUpload }
                        <Button href="/watch/{fileUpload.id}" --fg="var(--primary)">
                            <Play size={18}/>
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
    padding-bottom: 8vmin;
    background: var(--bg);
    z-index: 0;
  }
  .backdrop {
    height: 100vh;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:after, &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }

    &:before {
      backdrop-filter: blur(1rem);
      -webkit-mask: linear-gradient(180deg, transparent, black 50vmin);
    }

    &:after {
      background: linear-gradient(180deg, transparent, rgba(var(--bg-rgb),.8) 50vh, var(--bg) 100vh);
    }
  }

  .wrap {
    z-index: 2;
    position: relative;
  }

  main {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding-top: calc(5rem + 20vmin);
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
    h2 {
      font-weight: 400;
      font-size: 1.2rem;
      color: var(--primary);
      span:not(:last-child)::after {
        content: '·';
        padding-inline: .5rem;
      }
    }
</style>