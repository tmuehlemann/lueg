<script lang="ts">

    enum ButtonVariant {
        default = 'default',
        outline = 'outline',
    }
   export let variant: ButtonVariant = ButtonVariant.default
    export let className = ''

    export let href = null

</script>

{#if href}
    <a href={href}
       class={`btn rounded v-${variant} ${className}`}
       {... $$restProps}
    >
        <slot></slot>
    </a>
{:else}
    <button
        class={`btn rounded v-${variant} ${className}`}
        {... $$restProps}
        on:click
        on:keydown
    >
        <slot/>
    </button>
{/if}


<style lang="scss">
  button, a {
    padding: .5rem 1rem;
    cursor: pointer;
    display: flex;
    gap: .5rem;
    align-items: center;
    width: max-content;

    &:focus {
      box-shadow: var(--ring);
    }

    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    &.v-default {
      background: var(--fg);
      color: var(--bg);
    }

    &.v-outline {
      background: transparent;
      border: var(--border);
    }
  }
</style>