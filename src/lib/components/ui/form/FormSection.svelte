<script lang="ts">
  export let legend: string;
</script>

<fieldset>
  <legend class="bold mb-4 text-xl"> {legend} </legend>
  <slot />
</fieldset>
