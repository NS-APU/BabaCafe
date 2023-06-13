<script>
  import Sidebar from "../organizms/Sidebar.svelte";
  import Header from "../organizms/Header.svelte";
  import AuthGuard from "../wrappers/AuthGuard.svelte";
  import Toasts from "../atoms/Toasts.svelte";
  import { AppContent, Scrim } from "@smui/drawer";

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const close = () => (isOpen = false);
  const handleWindowKeyDown = (event) => {
    if (isOpen && event.key === 'Escape') {
      close();
    }
  }
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
    display: flex;
    height: calc(100vh - 55px);
    overflow: hidden;
    z-index: 0;
    top: 55px;
  }

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: calc(100vh - 55px);
    box-sizing: border-box;
  }
</style>
