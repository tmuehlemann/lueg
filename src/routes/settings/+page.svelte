<script lang="ts">
    import type { PageData } from './$types'
    export let data : PageData
</script>

<div class="wrap">

    <h1>settings</h1>

    <ul>
        <li>set theme color [auto, dark, light]</li>
        <li>change password</li>
        <li>active sessions</li>
    </ul>

    <h2>admin settings</h2>
        {#if data?.users}
            <h2>Users</h2>
            <ul>

                {#each data.users as user}
                    <li class="user">
                        {user.username}
                    </li>
                {/each}
            </ul>
        {/if}

    <ul>
        <li>re-index movies</li>
    </ul>

</div>
