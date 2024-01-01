<script lang="ts">
    import Input from "$lib/components/ui/form/Input.svelte";
    import Label from "$lib/components/ui/form/Label.svelte";
    import Button from "$lib/components/ui/form/Button.svelte";
    import FormField from "$lib/components/ui/form/FormField.svelte";
    import FormSection from "$lib/components/ui/form/FormSection.svelte";

    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    export let form: ActionData;

    $: console.log(form)

    let name = "";
    let password = "";

</script>

<div class="wrap">
    <form action="?/login" method="post" use:enhance >
        <FormSection legend="Login">

            <FormField>
                <Label for="username">Username</Label>
                <Input className="w-full" name="username" id="username" type="text" bind:value={name} />
            </FormField>

            <FormField>
                <Label for="password">Password</Label>
                <Input className="w-full" name="password" id="password" type="password" bind:value={password} />
            </FormField>

            <Button className="w-full">Login</Button>

            {#if form?.error}
                <ul class="notice-error rounded">
                    {#each form.errors as error}
                        <li>
                            {#if error.field}
                                <b>{error.field}:</b>
                            {/if}
                            {error.message}</li>
                    {/each}
                </ul>
            {/if}
        </FormSection>
    </form>
</div>

<style lang="scss">
.wrap {
  max-width: 400px;
  margin: 100px auto 0;
}

.notice-error {
  background: #f2dede;
  color: #a94442;
  padding: .5rem;
  margin: .5rem 0;
  li:not(:last-child) {
    padding-bottom: .5rem;
  }
}
</style>