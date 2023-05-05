<script>
  import { fade } from "svelte/transition";
</script>

<main transition:fade>
  <slot />
</main>

<style lang="postcss">
  main {
    @apply w-screen h-screen flex flex-col items-center;
  }
</style>
