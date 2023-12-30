<script lang="ts">
    import {enhance} from "$app/forms";
    import Button from "../../components/ui/form/Button.svelte";
    import FormField from "../../components/ui/form/FormField.svelte";
    import Label from "../../components/ui/form/Label.svelte";
    import Input from "../../components/ui/form/Input.svelte";
    import type {ActionData} from "./$types"
    import Wizard from "../../components/ui/Wizard.svelte";
    import Step from "../../components/ui/Step.svelte";
    import {FilePlus2, PartyPopper} from "lucide-svelte";
    import FindMetadata from "./FindMetadata.svelte";
    import UploadMovie from "./UploadMovie.svelte";
    import {formatBytes} from "$lib/helper/formatters";
    import PublishMovie from "./PublishMovie.svelte";

    export let form: ActionData;
    $: console.log(form)

    let selectedMovie = null;
    let uploadedFile = null;

    type NextFunction = () => void;

    function onMetadataSelect(e : CustomEvent, next: NextFunction) {
        selectedMovie = e.detail;
        next();
    }

    function onMovieUploaded(e : CustomEvent, next: NextFunction) {
        console.log('received event <UploadMovie>')
        uploadedFile = e.detail.file;
        next()
    }

</script>

<div class="wrap">

<h1>Add a new movie</h1>

    <Wizard let:multi let:next>
        <Step name="Select file" {multi}>
            <UploadMovie {form} on:upload={(e)=>onMovieUploaded(e,next)}/>
        </Step>
        <Step name="add metadata" {multi}>
            <FindMetadata {form} on:select={(e)=>onMetadataSelect(e,next)}  />
        </Step>
        <Step name="confirm" {multi}>
            <PublishMovie {form} {uploadedFile} {selectedMovie}/>
        </Step>
    </Wizard>
</div>

<style lang="scss">
  :global(.spinner) {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(359deg);
      }
    }
</style>