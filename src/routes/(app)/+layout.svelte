<script>
  import "/src/app.css";
  import Button from "$lib/components/ui/form/Button.svelte";
  import { enhance } from "$app/forms";
  import {
    Library,
    LibrarySquare,
    Plus,
    PlusSquare,
    Settings,
  } from "lucide-svelte";
  import Logo from "$lib/components/Logo.svelte";

  export let data;
</script>

<nav
  class="bg-background/95 border-border fixed inset-x-0 bottom-2 z-40 m-auto flex w-fit items-center justify-between rounded-xl border p-1 shadow-2xl shadow-black backdrop-blur"
>
  <ul class="flex items-center gap-2">
    {#if data?.user}
      <li>
        <Button variant="ghost" href="/">
          <Library strokeWidth={1.25} />
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
