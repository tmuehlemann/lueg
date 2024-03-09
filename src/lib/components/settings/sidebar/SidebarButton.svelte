<script>
  import { page } from "$app/stores";

  import Button from "$lib/components/ui/form/Button.svelte";

  export let href = "";
</script>

<Button
  variant="ghost"
  active={$page.url.pathname === href}
  {href}
  class="justify-start {$$props['class']}"
  {...$$restProps}
>
  <slot />
</Button>
