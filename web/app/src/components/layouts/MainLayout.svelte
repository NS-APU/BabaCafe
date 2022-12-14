<script>
  import Sidebar from "../organizms/Sidebar.svelte";
  import Header from "../organizms/Header.svelte";
  import AuthGuard from "../wrappers/AuthGuard.svelte";

  let open = true;
</script>

<div class="header-layout">
  <Header onClick={() => (open = !open)} />
  <AuthGuard>
    <div class="sidebar-layout">
      <Sidebar {open} class="fixed" />
      <main>
        <!-- routify:options preload="proximity" -->
        <slot />
      </main>
    </div>
  </AuthGuard>
</div>

<style lang="postcss">
  .header-layout {
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
