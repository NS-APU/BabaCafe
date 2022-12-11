<script>
  import Sidebar from "../organizms/Sidebar.svelte";
  import Header from "../organizms/Header.svelte";

  let open = true;
</script>

<div class="header-layout">
  <Header onClick={() => (open = !open)} />
  <div class="sidebar-layout">
    <Sidebar {open} class="fixed" />
    <main>
      <!-- routify:options preload="proximity" -->
      <slot />
    </main>
  </div>
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
