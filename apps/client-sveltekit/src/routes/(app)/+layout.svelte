<script>
  import "/src/app.css";
  import Button from "$lib/components/ui/form/Button.svelte";
  import { enhance } from "$app/forms";
  import {
    Library,
    LibrarySquare,
    Plus,
    PlusSquare,
    Search,
    Settings,
  } from "lucide-svelte";
  import Logo from "$lib/components/Logo.svelte";
  import { onNavigate } from "$app/navigation";

  export let data;

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<nav
  class="bg-background/80 vt-[header] border-border fixed inset-x-0 bottom-2 z-50 m-auto flex w-fit items-center justify-between rounded-xl border p-1 shadow-2xl shadow-black backdrop-blur"
>
  <ul class="flex items-center gap-2">
    {#if data?.user}
      <li>
        <Button variant="ghost" href="/">
          <Library strokeWidth={1.25} />
        </Button>
      </li>
      <li>
        <Button variant="ghost" href="/search">
          <Search strokeWidth={1.25} />
        </Button>
      </li>
      <li>
        <Button variant="ghost" href="/add">
          <Plus strokeWidth={1.25} />
        </Button>
      </li>
      <li class="flex items-center gap-4">
        <Button variant="ghost" href="/settings">
          <Settings strokeWidth={1.25} />
        </Button>
      </li>
    {:else}
      <li>
        <Button variant="ghost" href="/login">sign in</Button>
      </li>
    {/if}
  </ul>
</nav>

<slot />

<style>
  :global(::view-transition-group(header)) {
    animation-duration: 500ms;
    animation-timing-function: ease;
    z-index: 50;
  }
</style>
