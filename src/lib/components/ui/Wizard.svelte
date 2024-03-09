<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { onMount } from "svelte";
  import Button from "./form/Button.svelte";
  import { Check } from "lucide-svelte";
  type JsonBool = { [key: string]: boolean };

  const multi: Writable<JsonBool> = writable({});
  let current: number = 0;

  onMount(() => {
    multi.update((m) => {
      m[Object.keys(m)[current]] = true;
      return m;
    });
  });

  function next() {
    setCurrent(current + 1);
  }

  function prev() {
    setCurrent(current - 1);
  }

  function setCurrent(value: number) {
    const before = current;
    current = value;

    multi.update((m) => {
      m[Object.keys(m)[before]] = false;
      m[Object.keys(m)[current]] = true;

      return m;
    });

    console.log("updateed current", current);
  }
</script>

<header>
  <ul
    class="relative flex justify-between"
    style:--progress={current / (Object.keys($multi).length - 1)}
  >
    <div
      class="bg-foreground absolute inset-x-0 top-1/2 -z-10 h-0.5 origin-left scale-x-[var(--progress)] transition-transform"
    ></div>

    {#each Object.keys($multi) as segment, i}
      <li>
        <button
          class="bg-background ring-ring flex cursor-pointer items-center gap-4 rounded p-4 text-center transition-opacity focus:ring {i <=
          current
            ? 'opacity-100'
            : 'opacity-50'}"
          on:click={() => setCurrent(i)}
        >
          <div>{segment}</div>
          <div
            class="bg-foreground text-background flex size-6 items-center justify-center rounded-full text-xs"
          >
            {#if i < current}
              <Check size={16} />
            {:else}
              {i + 1}
            {/if}
          </div>
        </button>
      </li>
    {/each}
  </ul>
</header>

<slot {multi} {prev} {next} {setCurrent} />

<!--<div class=" flex content-center gap-4">-->
<!--  <Button on:click={prev} disabled={current === 0}>prev</Button>-->
<!--  <Button on:click={next} disabled={current === Object.keys($multi).length - 1}>-->
<!--    next-->
<!--  </Button>-->
<!--</div>-->
