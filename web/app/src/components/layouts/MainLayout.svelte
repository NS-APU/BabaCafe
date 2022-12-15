<script>
  import Sidebar from "../organizms/Sidebar.svelte";
  import Header from "../organizms/Header.svelte";
  import AuthGuard from "../wrappers/AuthGuard.svelte";
  import Toasts from "../atoms/Toasts.svelte";

  let open = true;
</script>

<div class="main-layout">
  <AuthGuard>
    <Header onClick={() => (open = !open)} />
    <div class="sidebar-layout">
      <Sidebar {open} class="fixed" />
      <main>
        <!-- routify:options preload="proximity" -->
        <slot />
      </main>
    </div>
  </AuthGuard>

  <Toasts />
</div>

<style lang="postcss">
  .main-layout {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    height: 100%;
  }

  .sidebar-layout {
    @apply mt-14;
    overflow: auto;
  }

  main {
    @apply ml-[256px];

    overflow-y: auto;
  }
</style>
