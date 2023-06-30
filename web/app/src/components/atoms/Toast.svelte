<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import CloseIcon from '../icon/CloseIcon.svelte';
  import ErrorIcon from '../icon/ErrorIcon.svelte';
  import SuccessIcon from '../icon/SuccessIcon.svelte';

  const dispatch = createEventDispatcher();

  export let type = 'error';
  export let dismissible = true;
</script>

<article class={type} role="alert" transition:fade>
  {#if type === 'success'}
    <SuccessIcon width="1.1em" />
  {:else}
    <ErrorIcon width="1.1em" />
  {/if}

  <div class="text">
    <slot />
  </div>

  {#if dismissible}
    <button class="close" on:click={() => dispatch('dismiss')}>
      <CloseIcon width="0.8em" />
    </button>
  {/if}
</article>

<style lang="postcss">
  article {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem 0.5rem 0 auto;
    color: white;
    border-radius: 0.2rem;
  }

  .error {
    background: indianred;
  }

  .success {
    background: mediumseagreen;
  }

  .text {
    margin-left: 1rem;
  }

  button {
    padding: 0;
    margin: 0 0 0 auto;
    font-size: 1rem;
    line-height: 1;
    color: white;
    background: transparent;
    border: 0 none;
  }
</style>
