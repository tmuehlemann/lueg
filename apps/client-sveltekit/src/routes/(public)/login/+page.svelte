<script lang="ts">
  import Input from "$lib/components/ui/form/Input.svelte";
  import Label from "$lib/components/ui/form/Label.svelte";
  import Button from "$lib/components/ui/form/Button.svelte";
  import FormField from "$lib/components/ui/form/FormField.svelte";
  import FormSection from "$lib/components/ui/form/FormSection.svelte";

  import { auth } from "$lib/service/auth";
  import { goto } from "$app/navigation";

  let name = "";
  let password = "";
</script>

<div class="m-auto mt-24 max-w-[400px]">
  <form
    on:submit|preventDefault={async () => {
      const success = await auth.login(name, password);
      if (success) {
        goto("/");
      }
    }}
  >
    <FormSection legend="Login">
      <FormField>
        <Label for="username">Username</Label>
        <Input
          class="w-full"
          name="username"
          id="username"
          type="text"
          bind:value={name}
        />
      </FormField>

      <FormField>
        <Label for="password">Password</Label>
        <Input
          class="w-full"
          name="password"
          id="password"
          type="password"
          bind:value={password}
        />
      </FormField>

      <Button class="w-full">Login</Button>

      <!--{#if form?.error}-->
      <!--  <ul class="my-2 rounded bg-red-100 p-2 text-red-800">-->
      <!--    {#each form.errors as error}-->
      <!--      <li class="not-last:pb-4">-->
      <!--        {#if error.field}-->
      <!--          <b>{error.field}:</b>-->
      <!--        {/if}-->
      <!--        {error.message}-->
      <!--      </li>-->
      <!--    {/each}-->
      <!--  </ul>-->
      <!--{/if}-->
    </FormSection>
  </form>
</div>
