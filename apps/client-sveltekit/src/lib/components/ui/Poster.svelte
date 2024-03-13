<script lang="ts">
  export let src;
  export let alt;
  export let size = "small";

  function path(src, size) {
    const prefix = size === "small" ? "200x300_" : "";

    return `/metadata/posters/${prefix}${src}`;
  }
</script>

<img class="h-full w-full" src={path(src, size)} {alt} />
