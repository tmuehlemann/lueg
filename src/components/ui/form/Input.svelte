<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";

    type $$Props = HTMLInputAttributes;
    // type $$Events = InputEvents;

    export let value : $$Props['value'] = undefined
    export let className: $$Props["class"] = undefined;

</script>

<input bind:value class={`rounded ${className}`} {...$$restProps} />

<style lang="scss">
    input {
      padding: .5rem 1rem;
      border: var(--border);
      background: transparent;

      &:focus {
        box-shadow: var(--ring);
      }
    }
</style>