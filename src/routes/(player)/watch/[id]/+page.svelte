<script lang="ts">
    import '/src/styles/main.scss';

    import {onMount} from "svelte";
    import {formatTime} from "$lib/helper/formatters";

    export let data

    let file
    let videoElm : HTMLVideoElement
    let progressbarElm : HTMLElement

    let timeElapsed = 0
    let duration = 0

    $: file = data.fileUpload

    $: console.log(data)

    onMount(()=>{

        setup()
    })

    async function setup() {
        await videoReady(videoElm)

        videoElm.play()

        duration = videoElm.duration

        videoElm.addEventListener('timeupdate', ()=>{
            timeElapsed = videoElm.currentTime
        })
    }

    function toggle() {
        videoElm.paused
            ? videoElm.play()
            : videoElm.pause()
    }

    function setProgress(e : MouseEvent) {

        const maxWidth = progressbarElm.getBoundingClientRect().width

        const skipTo = Math.round((e.offsetX / maxWidth) * duration);

        videoElm.currentTime = skipTo;
    }

    /**
     * helper function to wait until the video is ready
     * @param video : HTMLVideoElement - the video you want to wait for
     */
    function videoReady(video : HTMLVideoElement) {
        return new Promise((resolve, reject) => {

            if (!(video instanceof HTMLVideoElement)) reject()

            if (video?.duration > 0) {
                resolve()
                return
            }

            video.addEventListener("loadedmetadata", ()=> {
                resolve()
            })
        })
    }

    function formatDuration(duration: number) {
        let result = new Date(duration * 1000).toISOString().substring(11, 19)

        // remove hours if not needed
        if (duration < 60*60)
            return result.substring(3);

        return result;
    }

</script>


<div class="playback-ui wrap">
    <h2>
        {file.movie.title}
    </h2>

    <div class="progress"
         style:--elapsed="{timeElapsed / duration * 100}%">
        <div class="progress-bar"
             bind:this={progressbarElm}
             on:click={setProgress}
             ></div>
        <div class="te">{formatDuration(timeElapsed)}</div>
        <div class="duration">{ formatDuration(duration)}</div>
    </div>

    <a href="/film/{file.movie.id}">info</a>
</div>

<video on:click={toggle} bind:this={videoElm} >
    <source src="/library/{file.path}">
</video>

<style lang="scss">
video {
  width: 100%;
  height: 100%;
  background: #000;
}
.progress {
  position: relative;
}
.te {
  position: absolute;
  left: var(--elapsed);
  transform: translateX(-50%);
}
.duration {
  text-align: right;
}
.playback-ui {
  --fg: #fff;
  --fg-rgb: 255, 255, 255;
  position: fixed;
  color: var(--fg);
  bottom: 0;
  z-index: 100;
  left: 0;
  right: 0;
  padding: 2rem;
  width: 100%;
  .progress-bar {
    width: 100%;
    height: .5rem;
    backdrop-filter: blur(.5rem);
    background: rgba(var(--fg-rgb), 0.3);
    border-radius: 1rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: var(--elapsed);
      top: 0;
      width: 2px;
      background: var(--fg);
      height: 100%;
      transform: translateX(-50%);
    }
  }
}
</style>