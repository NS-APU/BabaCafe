<script lang="ts">
  import { AppContent, Scrim } from '@smui/drawer';
  import Toasts from '../atoms/Toasts.svelte';
  import Header from '../organizms/Header.svelte';
  import Sidebar from '../organizms/Sidebar.svelte';
  import AuthGuard from '../wrappers/AuthGuard.svelte';

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const close = () => (isOpen = false);
  const handleWindowKeyDown = (event: Event) => {
    if (isOpen && event instanceof KeyboardEvent && (event as KeyboardEvent).key === 'Escape') {
      close();
    }
  };
</script>

<svelte:window on:keydown={handleWindowKeyDown} />
<div class="main-layout">
  <AuthGuard>
    <Header {toggle} />
    <div class="sidebar-layout">
      <Sidebar {isOpen} {close} />
      <Scrim fixed={false} on:click={close} on:keydown={handleWindowKeyDown} />
      <AppContent class="app-content">
        <main class="main-content">
          <!-- routify:options preload="proximity" -->
          <slot />
        </main>
      </AppContent>
    </div>
  </AuthGuard>

  <Toasts />
</div>

<style lang="postcss">
  .sidebar-layout {
    position: relative;
    top: 55px;
    z-index: 0;
    display: flex;
    height: calc(100vh - 55px);
    overflow: hidden;
  }

  * :global(.app-content) {
    position: relative;
    flex: auto;
    flex-grow: 1;
    overflow: auto;
  }

  .main-content {
    box-sizing: border-box;
    height: calc(100vh - 55px);
    padding: 16px;
    overflow: auto;
  }
</style>
