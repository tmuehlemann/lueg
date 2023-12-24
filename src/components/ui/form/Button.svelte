<script lang="ts">

    enum ButtonVariant {
        default = 'default',
        outline = 'outline',
    }
   export let variant: ButtonVariant = ButtonVariant.default
    export let className = ''

</script>

<button
        class={`rounded v-${variant} ${className}`}
>
    <slot></slot>
</button>

<style lang="scss">
  button {
    display: block;
    padding: .5rem 1rem;

    &:focus {
      box-shadow: var(--ring);
    }

    &.v-default {
      background: var(--primary);
      color: white;
    }

    &.v-outline {
      background: transparent;
      border: var(--border);
    }
  }
</style>