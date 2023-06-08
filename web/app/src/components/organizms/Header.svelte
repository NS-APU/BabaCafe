<script lang="ts">
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import { isLogined } from "../../stores/Login";

  export let toggle: Function;
</script>

<TopAppBar variant="short">
  <Row>
    <Section>
      {#if $isLogined}
        <IconButton class="material-icons" on:click={toggle()}>menu</IconButton>
      {/if}
      <Title>BaBaCafeアプリ</Title>
    </Section>
  </Row>
</TopAppBar>

<style>
  /* Hide everything above this component. */
  :global(#smui-app),
  :global(body),
  :global(html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>
