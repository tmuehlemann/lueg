<script>
  import { page } from "$app/stores";

  import Button from "$lib/components/ui/form/Button.svelte";
</script>

<Button
  variant="ghost"
  active={$page.url.pathname === $$props["href"]}
  class="justify-start {$$props['class']}"
  {...$$restProps}
>
  <slot />
</Button>
