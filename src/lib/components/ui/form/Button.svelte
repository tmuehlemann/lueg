<script lang="ts">
  import { cn } from "$lib/helper/styles";
  import { cva } from "class-variance-authority";

  const BUTTON_VARIANTS = {
    default: "default",
    outline: "outline",
  } as const;

  type ObjectValues<T> = T[keyof T];

  type ButtonVariant = ObjectValues<typeof BUTTON_VARIANTS>;

  export let variant: ButtonVariant = "default";
  let extraClasses = "";
  export { extraClasses as class };

  let elm = "href" in $$props ? "a" : "button";

  const buttonClasses = cva(
    "ring-ring rounded inline-flex cursor-pointer items-center gap-2 py-2 px-4 focus:ring disabled:cursor-not-allowed disabled:opacity-50 justify-center",
    {
      variants: {
        variant: {
          default: "bg-foreground text-background",
          outline: "bg-transparent border border-border",
        },
      },
    },
  );
</script>

<svelte:element
  this={elm}
  on:click
  on:keydown
  class={cn(buttonClasses({ variant }), extraClasses)}
  {...$$restProps}
>
  <slot />
</svelte:element>
