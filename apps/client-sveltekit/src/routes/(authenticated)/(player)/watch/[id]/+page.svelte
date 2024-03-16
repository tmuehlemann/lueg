<script lang="ts">
  import "/src/app.css";

  import { onMount } from "svelte";
  import { formatTime } from "$lib/helper/formatters";

  export let data;

  let videoElm: HTMLVideoElement;
  let progressbarElm: HTMLElement;

  let timeElapsed = 0;
  let duration = 0;

  $: file = data.mediaFile;

  $: console.log(data);

  onMount(() => {
    setup();
  });

  async function setup() {
    await videoReady(videoElm);

    videoElm.play();

    duration = videoElm.duration;

    videoElm.addEventListener("timeupdate", () => {
      timeElapsed = videoElm.currentTime;
    });
  }

  function toggle() {
    videoElm.paused ? videoElm.play() : videoElm.pause();
  }

  function setProgress(e: MouseEvent) {
    const maxWidth = progressbarElm.getBoundingClientRect().width;

    const skipTo = Math.round((e.offsetX / maxWidth) * duration);

    videoElm.currentTime = skipTo;
  }

  /**
   * helper function to wait until the video is ready
   * @param video : HTMLVideoElement - the video you want to wait for
   */
  function videoReady(video: HTMLVideoElement) {
    return new Promise((resolve, reject) => {
      if (!(video instanceof HTMLVideoElement)) reject();

      if (video?.duration > 0) {
        resolve();
        return;
      }

      video.addEventListener("loadedmetadata", () => {
        resolve();
      });
    });
  }

  function formatDuration(duration: number) {
    let result = new Date(duration * 1000).toISOString().substring(11, 19);

    // remove hours if not needed
    if (duration < 60 * 60) return result.substring(3);

    return result;
  }
</script>

<div
  class="playback-ui container fixed inset-0 top-auto z-50 m-auto p-8 text-white"
>
  <h2>
    {file.movie.title}
  </h2>

  <div class="relative" style:--elapsed="{(timeElapsed / duration) * 100}%">
    <div
      class="relative h-2 w-full rounded-full bg-white/30 backdrop-blur"
      bind:this={progressbarElm}
      on:click={setProgress}
    >
      <div
        class="absolute left-[var(--elapsed)] top-0 h-full w-0.5 -translate-x-1/2 bg-white"
      ></div>
    </div>
    <div class="absolute left-[var(--elapsed)] -translate-x-1/2">
      {formatDuration(timeElapsed)}
    </div>
    <div class="text-right">{formatDuration(duration)}</div>
  </div>

  <a href="/film/{file.movie.id}">info</a>
</div>

<video class="h-full w-full bg-black" on:click={toggle} bind:this={videoElm}>
  <source src={file.path} />
</video>
