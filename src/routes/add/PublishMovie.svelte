<script>
    import {enhance} from "$app/forms";
    import {formatBytes} from "$lib/helper/formatters.ts";
    import Button from "../../components/ui/form/Button.svelte";
    import {PartyPopper} from "lucide-svelte";

    export let uploadedFile;
    export let selectedMovie;

</script>

<ul class="summary">
    {#if uploadedFile?.id}
    <li>
        <h3>file</h3>
        <section>
            <div class="key">path</div>
            <div class="value">{uploadedFile.path}</div>
            <div class="key">upload date</div>
            <div class="value">{(new Date()).toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</div>
            <div class="key">uploader</div>
            <div class="value">{uploadedFile.uploader}</div>
            <div class="key">size</div>
            <div class="value">{formatBytes(uploadedFile.size)}</div>
            <div class="key">type</div>
            <div class="value">{uploadedFile.type}</div>
        </section>
    </li>
    {:else}
    <li class="disabled">
        <h3>file</h3>
        <section>
            no file selected. Go back and select a file.
        </section>
    {/if}
    {#if selectedMovie?.title}
        <li>
            <h3>metadata</h3>
            <section>
                <div class="key">name</div>
                <div class="value">{selectedMovie.title}</div>
                <div class="key">Release date</div>
                <div class="value">{new Date(selectedMovie.release_date).toLocaleDateString(undefined, {dateStyle: 'long'})}</div>
                <div class="key">TMDB ID</div>
                <div class="value">
                    <a target="_blank" rel="external" href="https://www.themoviedb.org/movie/{selectedMovie.id}">{selectedMovie.id}</a>
                </div>
            </section>
        </li>
    {:else}
        <li class="disabled">
            <h3>metadata</h3>
            <section>
                no metadata selected. Go back and select a movie.
            </section>
    {/if}
    <li class="disabled">
        <h3>settings (not implemented)</h3>
        <section>
            <div class="key">collection</div>
            <div class="value">classics</div>
        </section>
    </li>
</ul>

{#if selectedMovie?.id && uploadedFile?.id}
    <form use:enhance method="post" action="?/publish">
        <input type="hidden" name="fileUploadId" value={uploadedFile.id}>
        <input type="hidden" name="tmdbId" value={selectedMovie.id}>
        <Button>
            Publish
            <PartyPopper strokeWidth={1.25} />
        </Button>
    </form>
{:else}
    <p>Can't publish. missing metadata or file.</p>
{/if}

<style lang="scss">

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .summary {
    h3 {
      margin-bottom: 0.5rem;
    }
    section {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      row-gap: 0.5rem;
      margin-bottom: 4rem;
      .value a{
        text-decoration: underline;
      }
    }
  }
</style>