<script lang="ts">
    import { enhance} from "$app/forms";
    import Button from "../../components/ui/form/Button.svelte";
    import FormField from "../../components/ui/form/FormField.svelte";
    import Label from "../../components/ui/form/Label.svelte";
    import Input from "../../components/ui/form/Input.svelte";
    import type { ActionData } from "./$types"
    import SearchResult from "../../components/ui/SearchResult.svelte";
    import Wizard from "../../components/ui/Wizard.svelte";
    import Step from "../../components/ui/Step.svelte";

    export let form: ActionData;
    $: console.log(form)

    function selectMovie(result) {
        console.log(result)
    }

</script>

<div class="wrap">

<h1>Add a new movie</h1>

    <Wizard let:multi>
        <Step name="upload" {multi}>
            <p>upload the file</p>
            <form action="">
                <FormField>
                    <Label for="file">File</Label>
                    <Input name="file" id="file" type="file" />
                </FormField>
                <Button type="submit">
                    upload
                </Button>
            </form>
        </Step>
        <Step name="add metadata" {multi}>
            <form action="?/hello" method="post" use:enhance>
                <FormField>
                    <Label for="query">Search Movie</Label>
                    <Input name="query" id="query" type="text" />
                </FormField>
                <Button type="submit">
                    search
                </Button>
            </form>

            {#if form?.data}
                <h2>Results</h2>

                <SearchResult result={form.data.results[0]} />

                <div class="search-results">
                    {#each form.data.results as result}
                        <div class="clickable" on:click={()=>selectMovie(result)} >
                            <SearchResult result={result} />
                        </div>
                    {/each}
                </div>
            {/if}

        </Step>
        <Step name="confirm" {multi}>
            <ul>
                <li>file</li>
                <li>metadata</li>
                <li>settings</li>
            </ul>
        </Step>
    </Wizard>
</div>

<style lang="scss">
  .clickable {
    cursor: pointer;
    height: 100%;
  }
    .search-results {
        display: grid;
      gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
</style>