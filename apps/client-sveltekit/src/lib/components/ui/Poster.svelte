<script lang="ts">
  export let src: string;
  export let alt: string;
  export let size = "small";

  function path(src: unknown, size: unknown) {
    const prefix = size === "small" ? "320/" : "";

    if (typeof src === "string" && src.startsWith("local:")) {
      return `http://localhost:3000/static/metadata/posters/${prefix}${src.slice(6)}.webp`;
    }

    return `https://via.placeholder.com/500x750?text=No+Image`;
  }
</script>

<img class="h-full w-full" src={path(src, size)} {alt} />
