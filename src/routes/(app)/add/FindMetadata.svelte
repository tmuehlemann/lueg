<script lang="ts">
  import { enhance } from "$app/forms";
  import SearchResult from "$lib/components/ui/SearchResult.svelte";
  import Button from "$lib/components/ui/form/Button.svelte";
  import FormField from "$lib/components/ui/form/FormField.svelte";
  import Label from "$lib/components/ui/form/Label.svelte";
  import Input from "$lib/components/ui/form/Input.svelte";
  import { BadgeCheck, Search } from "lucide-svelte";
  import type { ActionData } from "./$types.js";
  import { createEventDispatcher } from "svelte";
  export let form: ActionData;

  let selectedMovie = null;
  function selectMovie(result) {
    selectedMovie = result;
    console.log(result);
  }

  $: if (form?.data?.results?.length) {
    selectedMovie = form.data.results[0];
  }

  const dispatch = createEventDispatcher();

  function confirmSelection() {
    dispatch("select", selectedMovie);
  }
</script>

{#if selectedMovie}
  <SearchResult result={selectedMovie}>
    <Button on:click={confirmSelection}>
      Select
      <BadgeCheck strokeWidth={1.25} />
    </Button>
  </SearchResult>
{/if}
<form action="?/queryMetadata" method="post" use:enhance>
  <FormField>
    <Label required for="query">Search Movie</Label>
    <Input required name="query" id="query" type="text" class="w-full" />
  </FormField>
  <FormField>
    <Label for="year">Release year</Label>
    <Input name="year" id="year" type="text" />
  </FormField>
  <Button type="submit">
    <Search strokeWidth={1.25} /> search
  </Button>
</form>

{#if form?.data}
  {#if form.data?.results?.length}
    <h2>Results</h2>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {#each form.data.results as result}
        <div
          class="h-full cursor-pointer {selectedMovie === result
            ? 'ring-ring ring'
            : ''}"
          on:click={() => selectMovie(result)}
        >
          <SearchResult {result} />
        </div>
      {/each}
    </div>
  {:else}
    <p>No results</p>
  {/if}
{/if}
