<script lang="ts">
    export let data
</script>

<div class="wrap">
    <h1>Welcome to Lueg️ 👀</h1>

    {#if data?.users}
        <h2>Users</h2>
        <ul>

        {#each data.users as user}
            <li class="user">
                {user.name}
            </li>
        {/each}
        </ul>
    {/if}

</div>

<style lang="scss">
li {
  padding-block: .5rem;

  &:not(:last-child){
    border-bottom: 1px solid rgba(var(--fg-rgb), .1);
  }
}
</style>