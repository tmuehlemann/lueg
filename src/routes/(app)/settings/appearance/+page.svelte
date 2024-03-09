<script>
  import Heading from "$lib/components/settings/Heading.svelte";

  let theme = null;
</script>

<Heading>Appearance</Heading>
<Heading>Theme</Heading>

<label>
  <input type="radio" bind:group={theme} value="auto" />
  automatic
</label>

<label>
  <input type="radio" bind:group={theme} value="light" />
  light
</label>

<label>
  <input type="radio" bind:group={theme} value="dark" />
  dark
</label>
