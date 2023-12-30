<script>
  export let required = false;
</script>
<label class:required {...$$restProps} ><slot></slot></label>

<style lang="scss">
label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
.required:after {
    content: 'Required';
  font-size: .4rem;
  margin-left: .4rem;
  transform: translateY(-.4rem);
  display: inline-block;
  font-weight: 800;
  color: rgba(var(--fg-rgb), 0.7);
  text-transform: uppercase;
  letter-spacing: 0.056rem;
}
</style>
