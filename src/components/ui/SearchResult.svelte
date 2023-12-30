<script>
    export let result;
</script>

<article class="container">
    <div class="inner">
        <picture>
            <img src={'https://image.tmdb.org/t/p/original/' + result.poster_path} alt="poster for {result.title}">
        </picture>
        <div class="description max-reading">
            <h2>{result.title} ({result.release_date.substring(0,4)})</h2>
            {#if result.original_title !== result.title}
                <h3>{result.original_title}</h3>
            {/if}
            <p>{result.overview}</p>
            <p>
                id: {result.id}
            </p>
            <slot></slot>
        </div>
    </div>
</article>

<style lang="scss">
  picture {
    max-width: 300px;
  }

  .inner {
    position: relative;
    overflow: hidden;
  }

  @container (width > 800px) {
    .inner {
      display: flex;
      gap: 2rem;
    }
    picture, .description {
      margin-bottom: 2rem;
    }
  }

@container (width < 400px) {
  img {
    text-align: center;
  }
  picture {
    background: rgba(var(--fg-rgb), 0.3);
    height: 100%;
  }

  //.description {
  //  position: absolute;
  //  left: 0;
  //  top: 0;
  //  background: rgba(var(--bg-rgb), 0.5);
  //  backdrop-filter: blur(1rem);
  //  padding: 1rem;
  //}
  h2, h3 {
    font-size: 1rem;
    font-weight: 400;
  }
  p {
    display: none;
  }
}
</style>