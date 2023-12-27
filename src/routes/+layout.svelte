<script>
    import '/src/styles/main.scss';
    import Button from "../components/ui/form/Button.svelte";
    import {enhance} from "$app/forms";

    export let data;
</script>

<nav class="wrap">
    <div class="left">
        <ul>
            {#if data?.user}
                <li>
                    <a class="rounded" href="/">Home</a>
                </li>
                <li>
                    <a class="rounded" href="/add">add</a>
                </li>

            {/if}
        </ul>
    </div>
    <div class="right">
        <ul>
            {#if data.user}
                <li>
                    <a class="rounded" href="/settings">Settings</a>
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
    ul {
      display: flex;
      align-items: center;
      a {
        margin: 0 .5rem;
        padding: .5rem;
        &:first-of-type{
          margin-left: -.5rem;
        }
        &:hover {
          background: rgba(var(--fg-rgb), 0.05);
        }
      }
    }
  }
</style>