<script>
    export let result;
</script>

<article class="container">
    <div class="inner">
        <picture>
            <img src={'https://image.tmdb.org/t/p/original/' + result.poster_path} alt="poster for {result.title}">
        </picture>
        <div class="description max-reading">
            <h2>{result.title} - {result.release_date.substring(0,4)}</h2>
            <p>{result.overview}</p>
        </div>
    </div>
</article>

<style lang="scss">
  picture {
    max-width: 300px;
  }

  picture, .description {
    margin-bottom: 2rem;
  }

  @container (width > 800px) {
    .inner {
      display: flex;
      gap: 2rem;
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

  h2, p {
    display: none;
  }
}
</style>