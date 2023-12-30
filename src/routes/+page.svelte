<script lang="ts">
    import {enhance} from '$app/forms'
    import Button from "../components/ui/form/Button.svelte";
    import type { PageData } from './$types';
    export let data : PageData

</script>

<div class="wrap">
    <h1>Welcome {data.user.username}</h1>
    <p>
        this is Lueg️ 👀
    </p>
</div>

<style lang="scss">
li {
  padding-block: .5rem;

  &:not(:last-child){
    border-bottom: 1px solid rgba(var(--fg-rgb), .1);
  }
}
</style>