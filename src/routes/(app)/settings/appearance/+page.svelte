<script>
  import Heading from "$lib/components/settings/Heading.svelte";
  import Radio from "$lib/components/ui/form/RadioGroup.svelte";
  import { browser } from "$app/environment";
  import { Moon, RefreshCcw, Sun } from "lucide-svelte";

  let theme = null;
  let color = null;

  $: applyTheme(theme);
  function applyTheme(theme) {
    if (!browser) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  $: applyColor(color);
  function applyColor(color) {
    if (!browser) return;

    document.documentElement.style.setProperty("--primary", color);
  }

  const colors = ["255 68 0", "168 85 247", "59 130 246", "173 250 29"];
</script>

<Heading>Appearance</Heading>

<p>The changes are just temporary. Saving is not implemented yet.</p>

<Heading>Theme</Heading>

<fieldset class="flex gap-1">
  <Radio bind:group={theme} value="light">
    <Sun strokeWidth="1.2" />
    Light
  </Radio>
  <Radio bind:group={theme} value="dark">
    <Moon strokeWidth="1.2" />
    Dark
  </Radio>
  <Radio bind:group={theme} value="auto">
    <RefreshCcw strokeWidth="1.2" />
    Automatic
  </Radio>
</fieldset>

<Heading>Color</Heading>

<fieldset class="flex gap-1">
  {#each colors as c}
    <Radio bind:group={color} value={c}>
      <div style:--primary={c} class="bg-primary size-4 rounded-full"></div>
    </Radio>
  {/each}
</fieldset>
