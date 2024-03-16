<script lang="ts">
  import { cn } from "$lib/helper/styles";

  export let src: string;
  export let alt: string;
  export let size = "original";

  let extraClass: string = "";
  export { extraClass as class };

  function path(src: unknown, size: unknown) {
    if (typeof src === "string" && src.startsWith("local:")) {
      return `http://localhost:3000/static/metadata/backdrops/${src.slice(6)}.jpg`;
    }

    return `https://via.placeholder.com/500x750?text=No+Image`;
  }
</script>

<img class={cn("h-full w-full", extraClass)} src={path(src, size)} {alt} />
