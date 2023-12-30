<script>
    import '/src/styles/main.scss';
    import Button from "../components/ui/form/Button.svelte";
    import {enhance} from "$app/forms";
    import {LibrarySquare, PlusSquare, Settings} from "lucide-svelte";
    import Logo from "../components/Logo.svelte";

    export let data;
</script>

<nav class="wrap">
    <div class="left">
        <Logo></Logo>
        <ul>
            {#if data?.user}
                <li>
                    <a class="rounded" href="/"><LibrarySquare strokeWidth={1.25} />Library</a>
                </li>
                <li>
                    <a class="rounded" href="/add"><PlusSquare strokeWidth={1.25} />add</a>
                </li>

            {/if}
        </ul>
    </div>
    <div class="right">
        <ul>
            {#if data.user}
                <li>
                    <a class="rounded" href="/settings"><Settings strokeWidth={1.25} />Settings</a>
                </li>
                <li>
                    <form method="post" action="/?/logout" use:enhance>
                        <Button type="submit" variant="outline">Sign out</Button>
                    </form>
                </li>
            {:else}
                <li>
                    <a class="rounded" href="/login">Sign in</a>
                </li>
            {/if}
        </ul>
    </div>
</nav>

<slot></slot>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    padding: .8rem 1rem;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    ul {
      display: flex;
      align-items: center;
      a {
        display: flex;
        margin: 0 .5rem;
        padding: .5rem;
        gap: .5rem;
        &:first-of-type{
          margin-left: -.5rem;
        }
        &:hover {
          background: rgba(var(--fg-rgb), 0.05);
          color: var(--primary);
        }
      }
    }
  }
</style>