<script>
  import "/src/app.css";
  import Button from "$lib/components/ui/form/Button.svelte";
  import { enhance } from "$app/forms";
  import { LibrarySquare, PlusSquare, Settings } from "lucide-svelte";
  import Logo from "$lib/components/Logo.svelte";

  export let data;
</script>

<nav class="bg-background/50 sticky inset-x-0 top-0 z-10 backdrop-blur">
  <div
    class="border-border container m-auto flex items-center justify-between border-b p-4"
  >
    <div class="flex items-center gap-4">
      <Logo></Logo>
      <ul class="flex items-center">
        {#if data?.user}
          <li>
            <a
              class="hover:bg-foreground/5 hover:text-primary my-2 flex gap-2 rounded p-2"
              href="/"
            >
              <LibrarySquare strokeWidth={1.25} /> Library
            </a>
          </li>
          <li>
            <a
              class="hover:bg-foreground/5 hover:text-primary my-2 flex gap-2 rounded p-2"
              href="/add"
            >
              <PlusSquare strokeWidth={1.25} /> add
            </a>
          </li>
        {/if}
      </ul>
    </div>
    <ul class="flex gap-4">
      {#if data.user}
        <li class="flex items-center gap-4">
          <Button variant="ghost" href="/settings">
            <Settings strokeWidth={1.25} /> Settings
          </Button>
        </li>
      {:else}
        <li>
          <a
            class="hover:bg-foreground/5 hover:text-primary my-2 flex gap-2 rounded p-2"
            href="/login">Sign in</a
          >
        </li>
      {/if}
    </ul>
  </div>
</nav>

<slot />
