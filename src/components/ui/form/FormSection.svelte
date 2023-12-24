
<script lang="ts">
    export let legend : string
</script>

<fieldset>
    <legend>{legend}</legend>
    <slot></slot>
</fieldset>

<style lang="scss">
    fieldset {
      border: none;
      legend {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 1em;
      }
    }
</style>