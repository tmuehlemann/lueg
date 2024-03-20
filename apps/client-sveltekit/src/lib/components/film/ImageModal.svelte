<script lang="ts">
  // @ts-nocheck

  import { onMount } from "svelte";
  import Modal from "../ui/Modal.svelte";
  import { Accordion, Tabs } from "bits-ui";
  import { Image } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import Button from "../ui/form/Button.svelte";
  import { getMovieImages, patchMovie } from "$lib/service/api";

  export let movie;
  export let show;

  let items = [];

  $: show && loadImages();

  async function loadImages() {
    const images = await getMovieImages(movie.id);

    items = [
      {
        title: "posters",
        images: images.posters,
        transform: "w220_and_h330_face",
        selected: null,
        movie_field: "posterPath",
      },
      {
        title: "backdrops",
        images: images.backdrops,
        transform: "w500_and_h282_face",
        selected: null,
        movie_field: "backdropPath",
      },
      {
        title: "logos",
        images: images.logos,
        transform: "w500",
        selected: null,
        movie_field: "logoPath",
      },
    ];
  }

  async function handleUpdate() {
    const changes = items.reduce((acc, item) => {
      if (item.selected) {
        acc[item.movie_field] = item.selected;
      }
      return acc;
    }, {});

    const resp = patchMovie(movie.id, changes);

    // remove changes
    items.forEach((item) => {
      item.selected = null;
    });

    items = [...items];
  }
</script>

<Modal bind:show title="Images" on:close>
  {#if items.length === 0}
    loading ...
  {:else}
    <Tabs.Root>
      <Tabs.List
        class="bg-foreground/10 border-border mb-4 grid w-full grid-cols-3 gap-1 rounded-[9px] border p-1 text-sm font-semibold leading-[0.01em]"
      >
        {#each items as item}
          <Tabs.Trigger
            value={item.title}
            class="data-[state=active]:bg-background relative h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:shadow-sm"
          >
            {item.title}

            {#if item.selected}
              <div
                class="bg-primary absolute right-2 top-1/2 size-2 -translate-y-1/2 rounded-full"
              ></div>
            {/if}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
      {#each items as item, i}
        <Tabs.Content value={item.title}>
          {#if item.images.length === 0}
            <div class="text-foreground/50 flex flex-col items-center pt-6">
              <Image size="3rem" strokeWidth="1.2" />
              <p class=" p-2 text-center">
                No {item.title} found
              </p>
            </div>
          {/if}

          <div class="flex flex-wrap gap-4">
            {#each item.images as image}
              <button
                data-selected={item.selected === image.file_path ? true : null}
                on:click={() => {
                  items[i].selected = image.file_path;
                }}
                class="relative overflow-hidden rounded-md outline-offset-2 data-[selected]:outline"
              >
                <div class="absolute inset-0 cursor-pointer"></div>
                <img
                  src="https://image.tmdb.org/t/p/{item.transform}{image.file_path}"
                  alt="poster"
                />
              </button>
            {/each}
          </div>
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  {/if}

  <div
    slot="footer"
    class="border-border bg-background/10 text-forground sticky bottom-0 border-t p-8 backdrop-blur-3xl"
  >
    <Button on:click={handleUpdate}>Update</Button>
  </div>
</Modal>
