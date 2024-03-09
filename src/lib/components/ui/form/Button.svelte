<script lang="ts">
  import { cn } from "$lib/helper/styles";
  import { cva } from "class-variance-authority";

  const BUTTON_VARIANTS = {
    default: "default",
    outline: "outline",
    ghost: "ghost",
  } as const;

  type ObjectValues<T> = T[keyof T];

  type ButtonVariant = ObjectValues<typeof BUTTON_VARIANTS>;

  export let variant: ButtonVariant = "default";
  let extraClasses = "";
  export { extraClasses as class };
  export let active = false;

  let elm = "href" in $$props ? "a" : "button";

  const buttonClasses = cva(
    "rounded inline-flex cursor-pointer items-center gap-2 py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 justify-center active:scale-[.98] transition-transform data-[active]:bg-foreground/10",
    {
      variants: {
        variant: {
          default: "bg-foreground text-background",
          outline: "bg-transparent border border-border",
          ghost: "active:bg-foreground/5 hover:bg-foreground/5",
        },
      },
    },
  );
</script>

<svelte:element
  this={elm}
  data-active={active ? true : null}
  on:click
  on:keydown
  class={cn(buttonClasses({ variant }), extraClasses)}
  {...$$restProps}
>
  <slot />
</svelte:element>
