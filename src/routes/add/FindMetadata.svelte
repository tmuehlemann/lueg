<script lang="ts">
    import { enhance} from "$app/forms";
    import SearchResult from "../../components/ui/SearchResult.svelte";
    import Button from "../../components/ui/form/Button.svelte";
    import FormField from "../../components/ui/form/FormField.svelte";
    import Label from "../../components/ui/form/Label.svelte";
    import Input from "../../components/ui/form/Input.svelte";
    import {BadgeCheck, Search} from "lucide-svelte";
    import type {ActionData} from "./$types.js";
    import {createEventDispatcher} from "svelte";
    export let form: ActionData;

    let selectedMovie = null;
    function selectMovie(result) {
        selectedMovie = result;
        console.log(result)
    }

    $: if(form?.data?.results?.length) {
        selectedMovie = form.data.results[0]
    }

    const dispatch = createEventDispatcher();

    function confirmSelection() {
        dispatch('select', selectedMovie);
    }

</script>

{#if selectedMovie}
    <SearchResult result={selectedMovie} >
        <Button on:click={confirmSelection}>
            Select
            <BadgeCheck strokeWidth={1.25} />
        </Button>
    </SearchResult>
{/if}
<form action="?/queryMetadata" method="post" use:enhance>
    <FormField>
        <Label required for="query">Search Movie</Label>
        <Input required name="query" id="query" type="text" className="w-full"/>
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

        <div class="search-results">
            {#each form.data.results as result}
                <div class="clickable"
                     on:click={()=>selectMovie(result)}
                     class:active={selectedMovie === result}>
                    <SearchResult result={result}/>
                </div>
            {/each}
        </div>
    {:else}
        <p>No results</p>
    {/if}
{/if}

<style lang="scss">
  .clickable {
    cursor: pointer;
    height: 100%;
    &.active {
      box-shadow: var(--ring);
    }
  }
  .search-results {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
</style>