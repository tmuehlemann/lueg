<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/helper/styles";

  type $$Props = HTMLInputAttributes;
  // type $$Events = InputEvents;

  export let value: $$Props["value"] = undefined;

  let extraClasses = "";
  export { extraClasses as class };
</script>

<input
  bind:value
  class={cn(
    "border-border text-foreground rounded border bg-transparent px-4 py-2 focus:ring ",
    extraClasses,
  )}
  {...$$restProps}
/>
