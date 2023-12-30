<script lang="ts">
    import {writable, type Writable} from "svelte/store";
    import {onMount} from "svelte";
    import Button from "./form/Button.svelte";
    import {Check} from "lucide-svelte";
    type JsonBool = {[key: string]: boolean};

    const multi: Writable<JsonBool> = writable({})
    let current: number = 0;

    onMount(() => {
        multi.update( m => {
            m[Object.keys(m)[current]] = true
            return m
        })
    })

    function next() {
        setCurrent(current + 1)
    }

    function prev() {
        setCurrent(current - 1)
    }

    function setCurrent(value: number) {

        const before = current
        current = value

        multi.update( m => {
            m[Object.keys(m)[before]] = false
            m[Object.keys(m)[current]] = true

            return m
        })

        console.log('updateed current', current)
    }

</script>

<header>
    <ul style:--progress={current / (Object.keys($multi).length - 1) } >
        {#each Object.keys($multi) as segment, i}
            <li class:active={i <= current}>
                <button class="rounded" on:click={()=>setCurrent(i)}>
                <div>{segment}</div>
                <div class="circle">
                    {#if i < current }
                        <Check size={16}  />
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

<!--<div class="footer">-->
<!--    <Button on:click={prev}-->
<!--            disabled={current === 0}-->
<!--    >-->
<!--        prev-->
<!--    </Button>-->
<!--    <Button on:click={next}-->
<!--            disabled={current === Object.keys($multi).length - 1}-->
<!--    >-->
<!--        next-->
<!--    </Button>-->
<!--</div>-->

<style lang="scss">

  header {
    ul {
      display: flex;
      justify-content: space-between;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        background: var(--fg);
        transition: 500ms ease transform;
        transform: scaleX(var(--progress));
        transform-origin: left;
        z-index: -1;
      }

      li {
        button {
          background: var(--bg);
          text-align: center;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          cursor: pointer;
          &:focus {
            outline: none;
            box-shadow: var(--ring);
          }

          > * {
            opacity: .5;
            transition: 300ms ease opacity;
          }
        }

        .circle {
          $size: 1.5rem;
          width: $size;
          height: $size;
          border-radius: 50%;
          font-size: .75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--fg);
          color: var(--bg);
        }

        &.active button > * {
          opacity: 1;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
</style>