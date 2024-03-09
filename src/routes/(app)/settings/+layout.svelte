<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import Button from "$lib/components/settings/sidebar/SidebarButton.svelte";
  import Title from "$lib/components/settings/sidebar/SidebarTitle.svelte";
  import Divider from "$lib/components/settings/sidebar/SidebarDivider.svelte";
  import {
    Book,
    CircleUserRound,
    LogOut,
    Shield,
    SwatchBook,
  } from "lucide-svelte";
  export let data: PageData;
</script>

<div class="flex h-full">
  <aside class="bg-foreground/5 relative flex-1 [flex-basis:300px]">
    <div class="sticky top-0 ml-auto flex w-[300px] flex-col gap-y-1 px-4">
      <Title>User Settings</Title>
      <Button href="/settings/profile"
        ><CircleUserRound strokeWidth="1.2" /> Profile</Button
      >
      <Divider></Divider>
      <Title>App Settings</Title>
      <Button href="/settings/appearance">
        <SwatchBook strokeWidth="1.2" /> Appearance
      </Button>
      <Button href="/settings/media"><Book strokeWidth="1.2" /> Media</Button>
      <Button href="/settings/admin"><Shield strokeWidth="1.2" /> Admin</Button>
      <Divider />
      <form
        class="contents text-red-500"
        method="post"
        action="/?/logout"
        style:--foreground="255 25 0"
        use:enhance
      >
        <Button type="submit">
          <LogOut strokeWidth="1.2" /> Sign out
        </Button>
      </form>
    </div>
  </aside>
  <main class="flex-1 px-5 pt-8 [flex-basis:900px]">
    <slot />
  </main>
</div>
