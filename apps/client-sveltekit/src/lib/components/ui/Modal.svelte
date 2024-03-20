<script lang="ts">
  import { clickOutside } from "$lib/helper/actions";
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";

  export let show: Boolean = false;
  export let title: String;

  const dispatch = createEventDispatcher();

  function close() {
    show = false;
    dispatch("close");
  }
</script>

{#if show}
  <div
    transition:fade
    class="bg-background/80 fixed inset-0 z-50 flex cursor-pointer items-center justify-center py-32 md:px-8"
  >
    <div
      transition:scale={{ start: 0.96 }}
      use:clickOutside
      on:clickOutside={close}
      class="bg-background/20 text-forground border-border h-full w-full max-w-[1200px] cursor-default overflow-hidden rounded-3xl border backdrop-blur-3xl"
    >
      {#if title}
        <header class="border-border sticky top-0 border-b p-8">
          <h2 class="text-bold text-2xl">Images</h2>
        </header>
      {/if}
      <div class="h-full overflow-y-auto p-8">
        <slot />
      </div>
      <slot name="footer" />
    </div>
  </div>
{/if}
