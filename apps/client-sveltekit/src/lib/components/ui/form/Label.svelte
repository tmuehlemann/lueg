<script>
  export let required = false;
</script>

<label class:required {...$$restProps}>
  <slot />
  {#if required}
    <span
      class=" text-foreground/70 inline-block -translate-y-2 select-none text-[0.4rem] font-extrabold uppercase tracking-wider"
    >
      Required
    </span>
  {/if}
</label>
