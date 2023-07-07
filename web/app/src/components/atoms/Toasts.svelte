<script lang="ts">
  import { dismissToast, toasts } from '../../stores/Toast';
  import Toast from './Toast.svelte';
</script>

{#if $toasts}
  <section>
    {#each $toasts as toast (toast.id)}
      <Toast type={toast.type} dismissible={toast.dismissible} on:dismiss={() => dismissToast(toast.id)}
        >{toast.message}</Toast
      >
    {/each}
  </section>
{/if}

<style lang="postcss">
  section {
    position: fixed;
    top: 5%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: right;
    width: 100%;
    margin-top: 1rem;
  }
</style>
