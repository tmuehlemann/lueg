<script lang="ts">
    import type {Writable} from "svelte/store";

    type JsonBool = { [key: string]: boolean };

    export let name: string
    export let multi: Writable<JsonBool>

    let visible = false

    multi.update(m => {
        m[name] = visible
        return m
    })

    multi.subscribe(m => {
        visible = m[name]
        console.log(name, 'is', visible? 'visible' : 'hidden')
    })

</script>

{#if visible}
    <div>
        <h2>{name}</h2>
        <slot />
    </div>
{/if}