<script>
  import { page } from "$app/stores";

  import Button from "$lib/components/ui/form/Button.svelte";
  import { cn } from "$lib/helper/styles";

  let extraClasses = "";

  export { extraClasses as class };
</script>

<Button
  variant="ghost"
  active={$page.url.pathname === $$props["href"]}
  class={cn("justify-start", extraClasses)}
  on:click
  {...$$restProps}
>
  <slot />
</Button>
