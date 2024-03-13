<script lang="ts">
  import { FilePlus2, Loader2 } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import Label from "$lib/components/ui/form/Label.svelte";
  import FormField from "$lib/components/ui/form/FormField.svelte";
  import Button from "$lib/components/ui/form/Button.svelte";
  import Input from "$lib/components/ui/form/Input.svelte";
  import { createEventDispatcher, onMount } from "svelte";

  // export let form
  let uploading = false;

  export let form = null;

  // onMount(() => {
  //
  //     form = {
  //         "success": true,
  //         "data": {
  //             "movieName": [
  //                 "Godzilla 1954",
  //                 "Godzilla"
  //             ],
  //             "file": {
  //                 "path": "static/library/Godzilla.1954.mp4",
  //                 "type": "video/mp4",
  //                 "size": 1582209873,
  //                 "uploader": "admin",
  //                 "id": 4
  //             }
  //         }
  //     }
  // })

  $: onFormUpdate(form);

  const dispatch = createEventDispatcher();

  function onFormUpdate(form) {
    if (!form?.data?.file || !form?.data?.movieName) {
      return;
    }

    dispatch("upload", form.data);
  }
</script>

<p class="mb-4 max-w-prose">
  Select a file to upload. The file will be uploaded to the server and
  processed. This may take a while depending on the size of the file.
</p>
<form
  action="?/upload"
  enctype="multipart/form-data"
  method="post"
  use:enhance={() => {
    uploading = true;
    return async ({ update }) => {
      await update();
      uploading = false;
    };
  }}
>
  <FormField>
    <Label for="file">upload file</Label>
    <Input name="file" id="file" type="file" accept=".mp4, .mkv" />
  </FormField>
  {#if !uploading}
    <Button type="submit">
      <FilePlus2 strokeWidth={1.25} />
      upload
    </Button>
  {:else}
    <div style="display: flex">
      <Loader2 class="animate-spin" strokeWidth={1.25} />
      Uploading movie...
    </div>
  {/if}
</form>
