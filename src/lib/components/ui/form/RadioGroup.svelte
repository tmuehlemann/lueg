<script>
  export let group = undefined;
  export let value = undefined;
</script>

<label
  data-active={group === value ? true : null}
  class="hover:bg-foreground/5 data-[active]:border-primary data-[active]:bg-primary/5 data-[active]:text-primary border-border inline-flex grow-0 cursor-pointer items-center gap-2 rounded-lg border p-2 pr-4 transition-transform active:scale-[.98]"
>
  <input class="peer hidden" type="radio" bind:group {value} {...$$restProps} />
  <span
    class="peer-checked:border-primary border-border size-4 rounded-full border shadow-sm transition-all peer-checked:border-4"
  ></span>
  <slot />
</label>
